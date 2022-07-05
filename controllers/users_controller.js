const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
// let's keep it same as before
module.exports.profile = async function (req, res) {
	try {
		let posts = await Post.find({})
			.populate("user")
			.populate({
				path: "comments",
				populate: {
					path: "user",
				},
			});
		let users = await User.findById(req.params.id);
		return res.render("user_profile", {
			title: "User Profile",
			profile_user: users,
			posts: posts,
		});
	} catch (err) {
		console.log("Error", err);
		return;
	}
};

module.exports.update = function (req, res) {
	if (req.user.id == req.params.id) {
		User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
			req.flash("success", "Updated!");
			return res.redirect("back");
		});
	} else {
		req.flash("error", "Unauthorized!");
		return res.status(401).send("Unauthorized");
	}
};

// render the sign up page
module.exports.signUp = function (req, res) {
	if (req.isAuthenticated()) {
		return res.redirect("/users/profile");
	}

	return res.render("user_sign_up", {
		title: "Project Portal | Sign Up",
	});
};

// render the sign in page
module.exports.signIn = function (req, res) {
	if (req.isAuthenticated()) {
		return res.redirect("/users/profile");
	}
	return res.render("user_sign_in", {
		title: "Project Portal | Sign In",
	});
};

// get the sign up data
module.exports.create = function (req, res) {
	if (req.body.password != req.body.confirm_password) {
		req.flash("error", "Passwords do not match");
		return res.redirect("back");
	}

	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) {
			req.flash("error", err);
			return;
		}

		if (!user) {
			let users = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				confirm_password: req.body.confirm_password,
			};
			bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
				// Store hash in your password DB.
				users.password = hash;
				users.confirm_password = hash;
				console.log(users.password);
				User.create(users, function (err, user) {
					console.log(users);
					if (err) {
						req.flash("error", err);
						return;
					}

					return res.redirect("/users/sign-in");
				});
			});
		} else {
			req.flash("success", "You have signed up, login to continue!");
			return res.redirect("back");
		}
	});
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
	req.flash("success", "Logged in Successfully");
	return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
	req.logout();
	req.flash("success", "You have logged out!");

	return res.redirect("/");
};
