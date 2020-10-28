import express from "express";
import jwt from "express-jwt";
import cors from "cors";

const app = express();

const jwtCheck = jwt({
	secret: process.env.JWT_SECRET,
	audience: process.env.ACCOUNT_AUDIENCE,
	issuer: process.env.ACCOUNT_ISSUER,
	algorithms: ["RS256"],
	credentialsRequired: false
});

// MARK: -- manage auth access
app.use(jwtCheck, (err, req, res, next) => {
	if (err.code == "invalid_token") {
		return next()
	}
	return next(err)
});

if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: "http://localhost:3000" }));
}

export default app;