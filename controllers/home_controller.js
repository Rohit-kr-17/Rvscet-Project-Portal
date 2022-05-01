const Post = require("../models/post");

module.exports.home = function (req, res) {
	// populate the user of each post
	Post.find({})
		.populate("user")
		.populate({
			path: "comments",
			populate: {
				path: "user",
			},
		})
		.exec(function (err, posts) {
			return res.render("home", {
				title: "Project Management | Home",
				posts: posts,
			});
		});
};

// module.exports.actionName = function(req, res){}
