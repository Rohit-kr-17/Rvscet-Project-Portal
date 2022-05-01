const mongoose = require("mongoose");

mongoose.connect(
	"mongodb+srv://Rohit_8580:Rohit%408580@cluster0.98i99.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
	console.log("Connected to Database :: MongoDB");
});

module.exports = db;
