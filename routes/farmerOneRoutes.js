const express = require("express");
const router = express.Router();

// Farmer One Dashboard Routes
router.get("/FOdashboard", (req, res) => {
	res.render("FO/FO-dashboard");
});

// Farmer One Dashboard Routes
router.get("/Ubaccounts", (req, res) => {
	res.render("FO/FO-ub-accounts");
});

module.exports = router;
