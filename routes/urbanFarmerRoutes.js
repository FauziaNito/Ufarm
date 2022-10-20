const express = require("express");
const router = express.Router();
const multer = require("multer");
const connectEnsureLogin = require("connect-ensure-login");


// Importing Models
const Produce = require('../models/ProduceUpload');

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
