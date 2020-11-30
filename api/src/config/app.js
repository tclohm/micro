import express from "express";
import jwt from "express-jwt";
import cors from "cors";
import helmet from "helmet";

const app = express();

const checkJWT = jwt({
	secret: process.env.JWT_SECRET,
	audience: process.env.ACCOUNT_AUDIENCE,
	issuer: process.env.ACCOUNT_ISSUER,
	algorithms: ['HS256'],
	credentialsRequired: false
});

// MARK: -- helmet
app.use(helmet());


// MARK: -- manage auth access
app.use(checkJWT, (err, req, res, next) => {
	if (err.code == "invalid_token") {
		return next()
	}
	return next(err)
});

if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: "http://localhost:3000" }));
}

export default app;