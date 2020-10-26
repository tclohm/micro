// MARK: -- user from 'api' directory
//		 -- node -r dotenv/config -r esm src/scripts/seedData.js <PASSWORD>
import faker from "faker";
import gravatarUrl from "gravatar-url";
import mongoose from "mongoose";

import auth0 from "../config/auth0";
import initMongoose from "../config/mongoose";

import Account from "../models/Account";
import Post from "../models/Post";
import Profile from "../models/Profile";
import Reply from "../models/Reply";

// MARK: -- initialize mongoose
initMongoose();

// MARK: -- set a randomness seed to retrieve consistent result from faker.js
faker.seed(451);

// MARK: -- check for password argument
const password = process.argv[2];

if (!password) {
	throw new Error("You must provide a password argument");
}

// MARK: -- declare author and moderator role permissions
const authorPermissions = [
	"read:own_account",
	"edit:own_account",
	"read:any_profile",
	"edit:own_profile",
	"read:any_content",
	"edit:own_content",
	"upload:own_media",
];

const moderatorPermissions = [
	"read:any_account",
	"block:any_account",
	"promote:any_account",
	"block:any_account"
];

// MARK: -- Delete all existing Auth0 users
async function deleteAuth0Data() {
	const users = await auth0.getUsers({ per_page: 100, page: 0 });
	for (const user of users) {
		await auth0.deleteUser({ id: user.user_id });
	}

	return "Auth0 data deleted...";
}

// MARK: -- Drop all existing documents from MongoDB collections
async function deleteMongoData() {
	await Post.deleteMany({}).exec();
	await Profile.deleteMany({}).exec();
	await Reply.deleteMany({}).exec();

	return "Mongo documents deleted...";
}

// MARK: -- Generate raw data to use for accounts, profiles, and content
function generateRawData() {
	const fakerData = Array.from({ length: 5 }, () => {
		// Create users
		const card = faker.helpers.contextualCard();
		const { name, email, username } = card;
		const avatar = gravatarUrl(email, { default: "mm" });
		const description = faker.lorem.sentence();

		// Create content
		const posts = Array.from({ length: 10 }, () => {
			return { text: faker.lorem.sentence(), media: faker.image.cats() };
		});

		const replies = Array.from({ length: 10 }, () => {
			return faker.lorem.sentence();
		});

		const user = {
			avatar,
			description,
			email: email.toLowerCase(),
			fullName: name,
			password,
			posts,
			replies,
			username: username.toLowerCase()
		};

		return user 
	});

	return fakerData
}

// MARK: Create Auth0 account from generated data
async function createAuth0Accounts(rawData) {
	let accounts = [];

	// Create 5 user accounts
	for (const user of rawData) {

		const account = await auth0.createUser({
			app_metadata: {
				groups: [],
				roles: ["author"],
				permissions: authorPermissions
			},
			connection: "Username-Password-Authentication",
			email: user.email,
			password: user.password
		});
		accounts.push(account)
	}

	// Upgrade first user account to a moderator role
	auth0.updateUser(
		{ id: accounts[0].user_id },
		{
			app_metadata: {
				groups: [],
				roles: ["moderator"],
				permissions: authorPermissions.concat(moderatorPermissions)
			}
		}
	);

	return accounts;
}

// MARK: -- Create a profile from generated raw data and Auth0 accounts
async function createProfiles(rawData, accounts) {
	let profiles = [];

	for (const user of rawData) {
		// use generated raw data and accounts data to create the profile object
		const { avatar, description, email, fullName, username } = user;

		// the 'accountId' by matching the Auth0 account and raw user object on email
		const { user_id } = accounts.find(account => email === account.email);

		const profile = {
			accountId: user_id,
			avatar,
			description,
			fullName,
			username
		};

		// create the new profile document
		const newProfile = new Profile(profile);
		const savedProfile = await newProfile.save();
		profiles.push(savedProfile);
	}

	return profiles;
}

// MARK: -- Create posts based on generated raw data and user profiles
async function createPosts(rawData, profiles) {
	let posts = [];

	// loop through the profile documents
	for (const profile of profiles) {
		const { _id, username } = profile;

		// get posts that belong to the user (based on the username)
		const { posts: postsContent } = rawData.find(
			user => username === user.username
		);

		// loop over array posts to create new documents for each post
		for (let content of postsContent) {
			const newPost = new Post({ authorProfileId: _id, text: content.text, media: content.media });
			const savedPost = await newPost.save();
			posts.push(savedPost);
		}

		// block user's eighth post
		const [postToBlock] = await Post.find({ authorProfileId: _id })
			.skip(7)
			.limit(1)
			.exec();
		await Post.updateOne({ _id: postToBlock._id }, { $set: { blocked: true } });
	}

	return posts;
}

// MARK: -- Create replies based on generated raw data, user profiles, and posts
async function createReplies(rawData, profiles, posts) {
	let replies = [];

	// loop through the profile documents
	for(const profile of profiles) {
		const { _id, username } = profile;

		// get the replies that belong to the user (based on a username)
		const { replies: repliesContent } = rawData.find(
			user => username === user.username
		);

		// loop over array of replies
		for (let content of repliesContent) {
			// randomly assign a parent post to each reply
			// ensure the parent wasn't written by the reply author
			let postAuthorProfileId = _id;
			let postId;

			while (postAuthorProfileId === _id) {
				const randomPost = faker.random.arrayElement(posts);
				postAuthorProfileId = randomPost.authorProfileId
				postId = randomPost._id;
			}

			// create new documents for each reply
			const newReply = new Reply({
				authorProfileId: _id,
				postAuthorProfileId,
				postId,
				result: content
			});

			const savedReply = await newReply.save();
			replies.push(savedReply);
		}

		// block the user's eighth reply
		const [replyToBlock] = await Reply.find({ authorProfileId: _id })
			.skip(7)
			.limit(1)
			.exec()

		await Reply.updateOne(
			{ _id: replyToBlock._id },
			{ $set: { blocked: true } }
		);
	}

	return replies;
}

// MARK: -- Update profiles to follow other user profiles
async function followOtherUsers(profiles) {
	let updatedProfiles = [];

	// loop through the profile documents
	for (const profile of profiles) {
		const { _id } = profile;

		// create an array with current user profile removed
		const otherProfiles = profiles.filter(pro => pro._id !== _id);

		// shuffle the profiles, get the first three items, then create an array of their IDs
		const profileIdsToFollow = faker.helpers
			.shuffle(otherProfiles)
			.slice(0,3)
			.map(pro => pro._id);

		// update the profile document
		const updatedProfile = await Profile.findOneAndUpdate(
			{ _id },
			{ $addToSet: { following: profileIdsToFollow } },
			{ new: true }
		).exec();
		updatedProfiles.push(updatedProfile);
	}

	return updatedProfiles;
}

// MARK: -- Populate Auth0 and MongoDB databases with data
async function populateAuth0AndMongo() {
	const rawData = generateRawData();
	const accounts = await createAuth0Accounts(rawData);
	const profiles = await createProfiles(rawData, accounts);
	const posts = await createPosts(rawData, profiles);
	await createReplies(rawData, profiles, posts);
	await followOtherUsers(profiles);

	return "User and content data created...";
}

// MARK: -- Run all functions to clean and set-up data
async function seedData() {
	try {
		const auth0Result = await deleteAuth0Data();
		console.log(auth0Result);
		const mongoResult = await deleteMongoData();
		console.log(mongoResult);
		const populateResult = await populateAuth0AndMongo();
		console.log(populateResult)
		console.log("🔨🔨 Built Complete 🔨🔨")
		mongoose.disconnect();
	} catch (error) {
		console.log(`Error: ${error}`);
	}
}


seedData();