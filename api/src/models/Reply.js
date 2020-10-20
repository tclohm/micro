import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
	authorProfileId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	blocked: {
		type: Boolean
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true
	},
	media: {
		type: String
	},
	postAuthorProfileId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	result: {
		type: String,
		maxlength: 256,
		required: true
	},
	edited: {
		type: Boolean,
		default: false
	}
});

const Reply = mongoose.model("Reply", replySchema);

export default Reply;