const express = require('express');
const router = express.Router();


// Agricultural Officer Dashboard Routes
router.get("/AOdashboard", (req, res) => {
	res.render("AO/AO-dashboard");
});
// Farmer One list
router.get("/FOlist", (req, res) => {
	res.render("AO/AO-fo-accounts");
});
// Farmer One Activities
router.get("/FOactivities", (req, res) => {
	res.render("AO/AO-fo-activities");
});
// Ward Routes
router.get("/addward", (req, res) => {
	res.render("AO/ward");
});
module.exports = router;