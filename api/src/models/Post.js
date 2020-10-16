import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	authorProfileId: {
		type: mongoose.Schema.Type.ObjectId,
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
		type: String,
		required: true
	},
	text: {
		type: String,
		maxlength: 256,
		required: true
	}
});

const Post = mongoose.model("Post", postSchema);

export default Post;