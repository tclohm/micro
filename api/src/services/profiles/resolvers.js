import { UserInputError } from "apollo-server";

const resolvers = {
	Account: {
		profile(account, args, { dataSources }, info) {
			return dataSources.profilesAPI.getProfile({
				accountId: account.id
			});
		}
	},

	Profile: {
		__resolveReference(reference, { dataSources }, info) {
			return dataSources.profilesAPI.getProfilesById(reference.id);
		},
		account(profile, args, context, info) {
			return { __typename: "Account", id: profile.accountId };
		},
		id(profile, args, context, info) {
			return profile._id;
		},
		viewerIsFollowing(profile, args, { dataSources, user }, info) {
			return dataSources.profilesAPI.checkViewerFollowsProfile(user.sub, profile._id);
		}
	},
	Query: {
		async profile(parent, { username }, { dataSources }, info) {
			const profile = await dataSources.profilesAPI.getProfile({ username });

			if (!profile) {
				throw new UserInputError("Profile does not exist.");
			}
			return profile;
		},
		profiles(parent, args, { dataSources }, info) {
			return dataSources.profilesAPI.getProfiles();
		}
	}
};

export default resolvers;