const express = require("express");
const router = express.Router();

// Importing Model
const Registration = require("../models/user");

// ******FarmerOne Registration Routes******
// Farmer One get Route
router.get("/registerFO", (req, res) => {
	res.render("AO/new-fo-form");
});

//Farmer One post Route
router.post("/registerFO", async (req, res) => {
	console.log(req.body);
	try {
		const user = new Registration(req.body);
		let uniqueExist = await Registration.findOne({ uniquenumber: req.body.uniquenumber});
		// let ninNumberExist = await Registration.findOne({ ninnumber: req.body.ninnumber });
		if (uniqueExist) {
			return res.status(400).send("Sorry this Unique Number already exists");
		} else{
			await Registration.register(user, req.body.password, (error) => {
				if (error) {
					throw error;
				}
				res.redirect("/registerFO");
			});
		}
	} catch (error) {
		res.status(400).send("Sorry, it seems there is trouble accessing this page");
		console.log(error);
	}
});

// ******Urban Farmer Registration Routes*****
// Urban Farmer get Route
router.get("/registerUF", (req, res) => {
	res.render("FO/new-ub-form");
});

// Urban Farmer Post Route
router.post("/registerUF", async (req, res) => {
	console.log(req.body);
	try {
		const user = new Registration(req.body);
		let uniqueExist = await Registration.findOne({ uniquenumber: req.body.uniquenumber });
		// let ninNumberExist = await Registration.findOne({ ninnumber: req.body.ninnumber });
		if (uniqueExist) {
			return res.status(400).send("Sorry this Unique Number already exists");
		} else {
			await Registration.register(user, req.body.password, (error) => {
				if (error) {
					throw error;
				}
				res.redirect("/registerUF");
			});
		}
	} catch (error) {
		res.status(400).send("Sorry, it seems there is trouble accessing this page");
		console.log(error);
	}
});


module.exports = router;
