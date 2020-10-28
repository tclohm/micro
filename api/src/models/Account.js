import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
	created_at: {
		type: Date,
		default: Date.now()
	},
	email: {
		type: String,
		required: true
	},
	email_verified: {
		type: Boolean
	},
	password: {
		type: String
	},
	updated_at: {
		type: Date,
		default: Date.now()
	},
	app_metadata: {
		type: mongoose.Schema.Types.Mixed,
	},
	identities: {
		type: Array
	},
	last_ip: {
		type: String,
	},
	last_login: {
		type: Date,
		default: Date.now()
	},
	logins_count: {
		type: Number,
		default: 1
	},
	blocked: {
		type: Boolean
	}
});

const Account = mongoose.model("Account", accountSchema);

export default Account;