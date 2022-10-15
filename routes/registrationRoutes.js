const express = require("express");
const router = express.Router();

// FarmerOne Registration Route
router.get("/registerFO", (req, res) => {
	res.render("AO/new-fo-form");
});
router.post("/registerFO", (req, res) => {
	console.log(req.body);
	res.redirect("/FOlist");
});

module.exports = router;
