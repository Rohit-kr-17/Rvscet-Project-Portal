const Post = require("../models/post");
const User = require("../models/user");

module.exports.createpost = function (req, res) {
	return res.render("create_post", {
		title: "Project Portal | Create Post",
	});
};
module.exports.viewpost = function (req, res) {
	return res.render("create_comment", {
		title: "Post Preview",
	});
};
