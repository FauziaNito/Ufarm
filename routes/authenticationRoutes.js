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
	res.redirect("/uploadproduce");
});

module.exports = router;
