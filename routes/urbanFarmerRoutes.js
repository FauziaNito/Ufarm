const express = require("express");
const router = express.Router();
const multer = require("multer");
const connectEnsureLogin = require("connect-ensure-login");

// Importing Models
const Produce = require("../models/ProduceUpload");

// image upload
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

var upload = multer({ storage: storage });

// Urban Farmer Produce Upload Route
// produce upload form get route if only a user is
router.get("/uploadproduce", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
	console.log("This is the Current User ", req.session.user);
	res.render("UF/produce-upload-form", { loggedUser: req.session.user });
});
// produce upload form post route
router.post("/uploadproduce", upload.single("imageupload"), async (req, res) => {
	console.log(req.body);
	try {
		const produce = new Produce(req.body);
		produce.imageupload = req.file.path;
		console.log("This is my produce", produce);
		await produce.save();
		res.redirect("/producelist");
	} catch (error) {
		res.status(400).send("Can't save this image");
		console.log(error);
	}
});

// Urban Farmer Dashboard Routes
router.get("/UFdashboard", (req, res) => {
	res.render("UF/UF-dashboard", { loggedUser: req.session.user });
	// res.render("UF/UF-dashboard");
});

// Getting Produce List from Database
router.get("/producelist", async (req, res) => {
	// res.render("UF/produce-list", { loggedUser: req.session.user });
	try {
		let products = await Produce.find().sort({ $natural: -1 });
		res.render("UF/produce-list", { loggedUser: req.session.user, products: products });
	} catch (error) {
		res.status(400).send("Unable to get Produce list");
	}
});

module.exports = router;
