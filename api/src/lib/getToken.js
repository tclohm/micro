import bent from "bent";
import Account from "../models/Account";
import { createToken, hashPassword, verifyPassword, getRefreshToken } from "../../../config/util";

export default async function(username, password) {

	const post = bent(process.env.ACCOUNTS_SERVICE_URL, "POST", "json", 200);
	const response = await post()

	try {
		
		const accountFromToken = await Token.findOne({
			refreshToken,
			expiresAt: { $gte: new Date() }
		}).select('account');

		if (!accountFromToken) {
			console.error("Not authorized")
		}

		const account = await Account.findOne({
			_id: accountFromToken.account
		});

		if (!account) {
			console.error("Not authorized")
		}

		const token = createToken(account);

		console.log(token)
	}
}