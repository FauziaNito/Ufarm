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

// Urban Farmer Dashboard Routes
router.get("/UFdashboard", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
	req.session.user = req.user;
	res.render("UF/UF-dashboard", { loggedUser: req.session.user });
});

// Urban Farmer Produce Upload Route
router.get("/uploadproduce", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
	req.session.user = req.user;
	if (req.user.role == "urbanfarmer") {
		console.log("This is the Current User ", req.session.user);
		res.render("UF/produce-upload-form", { loggedUser: req.session.user });
	} else {
		res.render("Sorry!! You are not allowed to access this Page");
	}
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

// // Getting Produce List from Database**************
// router.get("/producelist", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
// 	req.session.user = req.user;
// 	try {
// 		let products = await Produce.find().sort({ $natural: -1 });
// 		console.log("This is your user", req.session.user);
// 		res.render("UF/produce-list", { loggedUser: req.session.user, products: products });
// 	} catch (error) {
// 		res.status(400).send("Unable to get Produce list");
// 	}
// });

// Getting Produce List from Database by farmer
router.get("/producelist", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	try {
		let products = await Produce.find({farmerid:req.user}).sort({ $natural: -1 });
		console.log("This is your user", req.session.user);
		res.render("UF/produce-list", { loggedUser: req.session.user, products: products });
		console.log("Your Produce is ", products);
	} catch (error) {
		res.status(400).send("Unable to get Produce list");
	}
});

// Update get route for a particular id
router.get("/produce/update/:id", async (req, res) => {
	try {
		const updateProduct = await Produce.findOne({ _id: req.params.id });
		res.render("UF/produce-update", { loggedUser: req.session.user, product: updateProduct });
	} catch (error) {
		res.status(400).send("Unable to update produce");
	}
});

// Update post route
router.post("/produce/update", async (req, res) => {
	try {
		await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/producelist");
	} catch (error) {
		res.status(400).send("Unable to update produce");
	}
});

//delete Route
router.post("/produce/delete", async (req, res) => {
	try {
		await Produce.deleteOne({ _id: req.body.id });
		res.redirect("/producelist");
	} catch (error) {
		res.status(400).send("back");
	}
});

// Getting a List approved Produce from Database by farmer
router.get("/approvedlist", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	try {
		let products = await Produce.find({farmerid:req.user}).sort({ $natural: -1 });
		// console.log("This is your user", req.session.user);
		res.render("UF/approved-produce-list", { loggedUser: req.session.user, products: products });
		// console.log("Your Produce is ", products);
	} catch (error) {
		res.status(400).send("Unable to get Produce list");
	}
});
module.exports = router;
