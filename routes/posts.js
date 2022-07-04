const express = require("express");
const router = express.Router();
const passport = require("passport");

const postsController = require("../controllers/posts_controller");
const createPost = require("../controllers/create_post");

router.post("/create", passport.checkAuthentication, postsController.create);
router.get(
	"/destroy/:id",
	passport.checkAuthentication,
	postsController.destroy
);
router.get("/createpost", passport.checkAuthentication, createPost.createpost);
router.get("/viewpost", passport.checkAuthentication, createPost.viewpost);

module.exports = router;
