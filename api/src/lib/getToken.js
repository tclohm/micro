import { GraphQLObjectType } from "graphql";
import Account from "../models/Account";
import Token from "../models/Token";
import { createToken, hashPassword, verifyPassword, getRefreshToken } from "../config/util";

const saveRefreshToken = async (refreshToken, accountId) => {
	try {
		const storedRefreshToken = new Token({
			refreshToken,
			account: accountId,
			expiresAt: '15m'
		});
		console.log(storedRefreshToken);
		return await storedRefreshToken.save();
	} catch (err) {
		console.error(err);
		return err;
	}
};

export default async function(email, password) {
	console.log("in getToken")
	console.log(email, password)
	try {
		const existingAccount = await Account.findOne({ email }).exec();

		console.log(existingAccount)
		
		if (!existingAccount) {
			console.error("Could not find account");
		}

		const passwordValid = await verifyPassword(password, existingAccount.password);

		if (passwordValid) {
			const { created_at, ...rest } = existingAccount;
			const userInfo = Object.assign({}, { ...rest });

			console.log(userInfo);

			const token = createToken(userInfo);
			const expiresAt = '15m'

			const refreshToken = getRefreshToken();

			await saveRefreshToken(refreshToken, userInfo._id);

			console.log(refreshToken)
		}
	} catch (err) {
		console.error(err);
	}
}