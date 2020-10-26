import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserInputError } from "apollo-server";

export const createToken = account => {
	// MARK: -- sign the JWT
	if (!account) {
		throw new UserInputError(
			"No account was provided."
		);
	}
	const roles = account.app_metadata.roles

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
			user_metadata: account.user_metadata,
			iss: process.env.ACCOUNT_ISSUER,
			aud: process.env.ACCOUNT_AUDIENCE,
		},
		process.env.JWT_SECRET,
		{ algorithm: 'HS256', expiresIn: '1h' }
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