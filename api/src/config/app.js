import express from "express";
import cors from "cors";

const app = express()


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