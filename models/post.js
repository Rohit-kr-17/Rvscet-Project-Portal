const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		software: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		link: {
			type: String,
		},
		teamMembers: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		// include the array of ids of all comments in this post schema itself
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
