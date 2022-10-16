const express = require("express");
const router = express.Router();

// Urban Farmer Dashboard Routes
router.get("/UFdashboard", (req, res) => {
	res.render("UF/UF-dashboard");
});

module.exports = router;
