const express = require("express");
const router = express.Router();

// Farmer One Dashboard Routes
router.get("/FOdashboard", (req, res) => {
	res.render("FO/FO-dashboard", { loggedUser: req.session.user });
});

// Farmer One Dashboard Routes
router.get("/Ubaccounts", (req, res) => {
	res.render("FO/FO-ub-accounts", { loggedUser: req.session.user });
	// res.render("FO/FO-ub-accounts");
});

module.exports = router;
