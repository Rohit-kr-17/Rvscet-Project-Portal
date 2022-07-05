const Post = require("../models/post");
const User = require("../models/user");

module.exports.createpost = function (req, res) {
	return res.render("create_post", {
		title: "Project Portal | Create Post",
	});
};
module.exports.viewpost = async function (req, res) {
	let post = await Post.findById(req.params.id)
		.populate("user")
		.populate({
			path: "comments",
			populate: {
				path: "user",
			},
		});
	console.log(post.comments);
	let users = await User.find({});
	return res.render("create_comment", {
		title: "Post Preview",
		post: post,
		users: users,
	});
};
