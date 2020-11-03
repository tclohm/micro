import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import randToken from "rand-token";
import { UserInputError } from "apollo-server";
import Token from "../models/Token";

export const createToken = account => {
	// MARK: -- sign the JWT
	if (!account.app_metadata.roles) {
		throw new UserInputError(
			"No account role specified."
		);
	}

	return jwt.sign(
		{
			sub: account._id,
			email: account.email,
			app_metadata: account.app_metadata,
			iss: process.env.ACCOUNT_ISSUER,
			aud: process.env.ACCOUNT_AUDIENCE,
		},
		process.env.JWT_SECRET,
		{ algorithm: "HS256", expiresIn: "15m" }
	);
};

export const hashPassword = password => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(12, (err, salt) => {
			if (err) {
				reject(err);
			}
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					reject(err);
				}
				resolve(hash);
			});
		});
	});
};

export const verifyPassword = (passwordAttempt, hashedPassword) => {
	return bcrypt.compare(passwordAttempt, hashedPassword);
};

export const getRefreshToken = () => {
	return randToken.uid(64);
};

const thirtyMinutes = 3600 * 500

export const getDatePlusThirtyMinutes = () => {
	return new Date(new Date().valueOf() + thirtyMinutes);
} 

// ( 7 days ), ( 24 hours ), ( 3600 milliseconds * 1000 ) = 60 mins
// const oneWeek = 7 * 24 * 3600 * 1000

export const saveRefreshToken = async (refreshToken, accountId) => {
	try {

		const storedRefreshToken = new Token({
		  refreshToken,
		  account: accountId,
		  expiresAt: getDatePlusThirtyMinutes()
		});

		return await storedRefreshToken.save();

	} catch (err) {

	    return err;
	}
};