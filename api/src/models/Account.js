import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String
	},
	app_metadata: {
		type: mongoose.Schema.Types.Mixed,
	},
	user_metadata: {
		type: mongoose.Schema.Types.Mixed,
	},
	connection: {
		type: String,
		required: true,
		default: "Username-Password-Authentication"
	}
});

const Account = mongoose.model("Account", accountSchema);

export default Account;