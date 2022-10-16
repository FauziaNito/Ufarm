const express = require("express");
const router = express.Router();

// Farmer One Dashboard Routes
router.get("/FOdashboard", (req, res) => {
	res.render("FO/FO-dashboard");
});

module.exports = router;