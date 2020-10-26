import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
	refreshToken: { type: String, required: true },
	account: { type: mongoose.Types.ObjectId, required: true },
	expiresAt: { type: Date, required: true }
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
