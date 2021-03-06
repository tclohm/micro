import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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
		type: String,
		required: true
	},
	text: {
		type: String,
		maxlength: 256,
		required: true
	},
	edited: {
		type: Boolean,
		default: false
	}
});

postSchema.index({ text: "text" });

const Post = mongoose.model("Post", postSchema);

export default Post;