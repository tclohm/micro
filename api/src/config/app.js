import express from "express";
import jwt from "express-jwt";
import jwtDecode from "jwt-decode";
import cors from "cors";

const app = express();

const checkJWT = jwt({
	secret: process.env.JWT_SECRET,
	audience: process.env.ACCOUNT_AUDIENCE,
	issuer: process.env.ACCOUNT_ISSUER,
	algorithms: ['HS256'],
	credentialsRequired: false
});

const attachUser = (err, req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		next(err)
	}

	const decodedToken = jwtDecode(token.slice(7));

	if (!decodedToken) {
		next(err)
	}

	req.user = decodedToken;

	next();
};

// MARK: -- manage auth access
app.use(checkJWT, attachUser, (err, req, res, next) => {
	if (err.code == "invalid_token") {
		return next()
	}
	return next(err)
});

if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: "http://localhost:3000" }));
}

export default app;