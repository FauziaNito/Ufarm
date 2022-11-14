const express = require("express");
const router = express.Router();
const passport = require("passport");

// Importing Model
const Registration = require("../models/user");

router.get("/login", (req, res) => {
	res.render("login");
});

// Login post route
router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), async (req, res) => {
	req.session.user = req.user;
	let userExist = await Registration.findOne({ uniquenumber: req.user.uniquenumber, password: req.user.password });
	console.log("This user exists%%%%%%%", userExist);
	console.log("This is the user", req.session);

	if (req.user.role == "agriculturalofficer" && userExist) {
		res.redirect("/AOdashboard");
	} else if (req.user.role == "farmerOne" && userExist) {
		if (req.user.status == "Active") {
			res.redirect("/FOdashboard");
		} else if (req.user.status == "Not appointed") {
			res.send("Sorry, Wait until you're activated to login");
		} else {
			res.send("You are nolonger an employee of this Organization");
		}
	} else if (req.user.role == "urbanfarmer" && userExist) {
		if (req.user.status == "Active") {
			res.redirect("/UFdashboard");
		} else if (req.user.status == "Not appointed") {
			res.send("Sorry, Wait until you're activated to login");
		} else {
			res.send("You are nolonger an employee of this Organization");
		}
	} else if (req.user.role == "generalpublic" && userExist) {
		res.redirect("/");
	} else {
		res.send("Sorry!! You're not a registered user in the system");
	}
});

// Logout route
router.post("/logout", (req, res) => {
	if (req.session) {
		req.session.destroy(function (err) {
			if (err) {
				res.status(400).send("Unable to logout,Please check your Internet connection");
			} else {
				return res.redirect("/login");
			}
		});
	}
});
module.exports = router;
