const express = require("express");
const router = express.Router();

// Agricultural Officer Dashboard Routes
router.get("/AOdashboard", (req, res) => {
	res.render("AO/AO-dashboard", { loggedUser: req.session.user });
	// res.render("AO/AO-dashboard");
});
// Farmer One list
router.get("/FOlist", (req, res) => {
	res.render("AO/AO-fo-accounts", { loggedUser: req.session.user });
	// res.render("AO/AO-fo-accounts");
});
// Farmer One Activities
router.get("/FOactivities", (req, res) => {
	res.render("AO/AO-fo-activities", { loggedUser: req.session.user });
	// res.render("AO/AO-fo-activities");
});
// Ward Routes
router.get("/addward", (req, res) => {
	res.render("AO/ward", { loggedUser: req.session.user });
	// res.render("AO/ward");
});
// Testing layout Page
router.get("/layout", (req, res) => {
	res.render("AO/layout");
});

module.exports = router;
