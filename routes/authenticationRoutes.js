const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
	res.render("login");
});

// Login post route
router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
	req.session.user = req.user;
	console.log("This is the user", req.session);
	if (req.user.role == "agriculturalofficer") {
		res.redirect("/AOdashboard");
	} else if (req.user.role == "farmerOne") {
		if(req.user.status == 'Active'){
			res.redirect("/FOdashboard");
		}else if (req.user.status == "Not appointed") {
			res.send("Sorry, Wait until your activated to login");
		} else{
			res.send("You are nolonger an employee of this Organization");
		}
		
	} else if (req.user.role == "urbanfarmer") {
		res.redirect("/UFdashboard");
	} else {
		res.send("Your not a registered user in the system");
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
