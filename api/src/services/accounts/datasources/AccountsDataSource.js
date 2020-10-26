import { DataSource } from "apollo-datasource";
import { UserInputError, ApolloError } from "apollo-server";
import jwtDecode from "jwt-decode";

import { createToken, hashPassword, verifyPassword } from "../../../config/util";

class AccountsDataSource extends DataSource {

	authorPermissions = [
		"read:own_account",
		"edit:own_account",
		"read:any_profile",
		"edit:own_profile",
		"read:any_content",
		"edit:own_content",
		"upload:own_media"
	];

	moderatorPermissions = [
		"read:any_account",
		"block:any_account",
		"promote:any_account",
		"block:any_content"
	];

	constructor({ Account }) {
		super();
		this.Account = Account;
	}

	// MARK: -- CRUD
	getAccountById(id) {
		return this.Account.findById(id);
	}

	getAccounts() {
		return this.Account.find({});
	}

	async createAccount(email, password) {

		const existingEmail = await this.Account.findOne(email).exec();

		if (existingEmail) {
			throw new ApolloError("Email already exists");
		}

		const hashedPassword = await hashPassword(password);

		const account = new this.Account({
			app_metadata: {
				groups: [],
				roles: ["author"],
				permissions: this.authorPermissions
			},
			connection: "Username-Password-Authentication",
			email,
			password
		});

		const savedAccount = await account.save();

		if (savedAccount) {
			const token = createToken(savedAccount);
			const decodedToken = jwtDecode(token);
			const expiresAt = decodedToken.exp;
		}

		const { _id, createdAt } = savedAccount

		return {
			_id,
			email,
			createdAt,
			token
		}

	}

	async changeAccountBlockedStatus(id) {
		const  { blocked } = await this.Account.findById(id)
		return this.Account.findByIdAndUpdate(id, { blocked: !blocked });
	}

	async changeAccountModeratorRole(id) {
		const user = await this.Account.findById(id);
		const isModerator = user.app_metadata.roles.includes("moderator");
		const permissions = isModerator 
		? this.authorPermissions 
		: this.authorPermissions.concat(this.moderatorPermissions)

		return this.Account.findOneAndUpdate(
			id,
			{
				app_metadata: {
					groups: [],
					roles,
					permissions
				}
			}
		);
	}

	async updateAccount(id, { email, newPassword, password }) {
		if (!email && !newPassword && !password) {
			throw new UserInputError(
				"You must supply some account data to update."
			);
		} else if (email && newPassword && password) {
			throw new UserInputError(
				"Email and password cannot be updated simultaneously."
			);
		} else if ((!password && newPassword) || (password && newPassword)) {
			throw new UserInputError(
				"Provide the existing and new passwords when updating the password."
			);
		}

		if (!email) {
			const user = await this.Account.findById(id);
			await getToken(user.email, password);
			return this.Account.findByIdAndUpdate(id, { password: newPassword });
		}

		return this.Account.findByIdAndUpdate(id, { email });
	}

	async deleteAccount(id) {
		await this.Account.findByIdAndDelete(id);
		return true;
	}
}

export default AccountsDataSource;