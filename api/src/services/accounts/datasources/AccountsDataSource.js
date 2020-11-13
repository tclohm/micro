import { DataSource } from "apollo-datasource";
import { UserInputError, ApolloError } from "apollo-server";
import jwtDecode from "jwt-decode";

import { createToken, hashPassword, verifyPassword, getDatePlusThirtyMinutes, getRefreshToken } from "../../../config/util";

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

	constructor({ Account, Token }) {
		super();
		this.Account = Account;
		this.Token = Token;
	}

	// MARK: -- CRUD
	getAccountById(_id) {
		return this.Account.findById(_id);
	}

	getAccounts() {
		return this.Account.find({});
	}

	async saveRefreshToken (refreshToken, accountId){
		
		try {

			const token = await this.Token.findOneAndUpdate(
				accountId, 
				{
					refreshToken: refreshToken,
					expiresAt: getDatePlusThirtyMinutes()
				},
				{
					new: true
				}
			);
			
			if (!token) {
				throw new ApolloError("Error updating token");
			};

			return token

		} catch (err) {

    		return err;

		}
	}

	async createAccount(email, password) {
		try {

			const existingEmail = await this.Account.findOne({ email }).exec();

			if (existingEmail) {
				throw new ApolloError("Email already exists");
			}

			const hashedPassword = await hashPassword(password);

			const accountData = new this.Account({
				app_metadata: {
					groups: [],
					roles: ["author"],
					connection: "Username-Password-Authentication",
					permissions: this.authorPermissions
				},
				identities: [],
				email: email.toLowerCase(),
				password: hashedPassword,
				blocked: false
			});

			const savedAccount = await accountData.save();

			if (savedAccount) {
				
				const token = createToken(savedAccount);
				const expiresAt = getDatePlusThirtyMinutes();
				const { _id } = savedAccount;

				const tokenData = this.Token({
					refreshToken: token,
					accountId: _id,
					expiresAt,
				});

				const savedToken = await tokenData.save();

				if (!savedToken) {
					throw new ApolloError(
						"Token creation error"
					);
				}

				const { refreshToken, accountId } = savedToken;
				
				return { 
					message: "Account created!", 
					refreshToken, 
					accountId,
					expiresAt,
				};

				
			} else {

				throw new ApolloError(
					"There was a problem creating your account"
				);

			}

		} catch (err) {
			return err;
		}
	}

	async authenticate(email, password) {
		try {
			const account = await this.Account.findOne({
				email
			}).exec()

			if (!account) {
				throw new UserInputError(
					"Wrong email/username or password"
				);
			}
			
			const passwordValid = await verifyPassword(
				password,
				account.password
			);		

			if (passwordValid) {
				
				const { password, ...rest } = account;
				const userInfo = Object.assign({}, { ...rest });
				const token = createToken(userInfo._doc);

				const updatedAccount = await this.Account.findOneAndUpdate(
					{ _id: account._id },
					{
						$inc : { 'logins_count': 1 },
						last_login: Date.now(),
					},
					{
						new: true
					}
				);

				const savedRefToken = await this.saveRefreshToken(
					token,
					{ accountId: userInfo._doc._id }
				);

				const { refreshToken, expiresAt, accountId } = savedRefToken;

				return {
					message: "Account Updated",
					refreshToken,
					accountId,
					expiresAt
				}

			} else {

				throw new UserInputError(
					"Wrong email or password"
				);

			}

		} catch (err) {

			return err;

		}
	}

	async changeAccountBlockedStatus(_id) {
		const  { blocked } = await this.Account.findById(_id)
		return this.Account.findByIdAndUpdate(_id, { blocked: !blocked });
	}

	async changeAccountModeratorRole(_id) {
		const user = await this.Account.findById(_id);
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

	async updateAccount(_id, { email, newPassword, password }) {
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
			const user = await this.Account.findById(_id);
			await getToken(user.email, password);
			return this.Account.findByIdAndUpdate(_id, { password: newPassword });
		}

		return this.Account.findByIdAndUpdate(_id, { email });
	}

	async deleteAccount(_id) {
		await this.Account.findByIdAndDelete(_id);
		return true;
	}
}

export default AccountsDataSource;