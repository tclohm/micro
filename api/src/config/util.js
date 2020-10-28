import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import randToken from "rand-token";
import { UserInputError } from "apollo-server";

export const createToken = account => {
	// MARK: -- sign the JWT
	if (!account) {
		throw new UserInputError(
			"No account was provided."
		);
	}
	const app_metadata = account.app_metadata

	if (!app_metadata) {
		throw new Error(
			"No account metadata specified."
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
		{ algorithm: "RS256", expiresIn: "15m" }
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