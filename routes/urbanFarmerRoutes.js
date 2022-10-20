const express = require("express");
const router = express.Router();

// Urban Farmer Dashboard Routes
router.get("/UFdashboard", (req, res) => {
	res.render("UF/UF-dashboard");
});

// Urban Farmer Produce Upload Route
// produce upload form get route
router.get("/uploadproduce", (req, res) => {
	res.render("UF/produce-upload-form");
});

module.exports = router;
