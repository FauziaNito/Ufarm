const express = require("express");
const router = express.Router();

// Importing Model
const Registration = require("../models/user");

// FarmerOne Registration Routes
router.get("/registerFO", (req, res) => {
	res.render("AO/new-fo-form");
});

router.post("/registerFO", async (req, res) => {
	console.log(req.body);
	try {
		const user = new Registration(req.body);
		await Registration.register(user, req.body.password, (error) => {
			if (error) {
				throw error;
			}
			res.redirect("/registerFO");
		});
	} catch (error) {
		res.status(400).send("Sorry, it seems there is trouble accessing this page");
		console.log(error);
	}
});

module.exports = router;
