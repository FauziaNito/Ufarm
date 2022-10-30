const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const Produce = require("../models/ProduceUpload");
const Registration = require("../models/user");

// Farmer One Dashboard Routes
router.get("/FOdashboard", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
	res.render("FO/FO-dashboard", { loggedUser: req.session.user });
});

// List of Urban Farmer Route
router.get("/Ubaccounts", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
	res.render("FO/FO-ub-accounts", { loggedUser: req.session.user });
	// res.render("FO/FO-ub-accounts");
});

// list of produce awaiting Approval
router.get("/approveproduce", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	console.log("Logged In this FarmerOne", req.user);

	try {
		// let matchWard = await Registration.aggregate({ $match: $and[{role: "urbanfarmer"},
		// { ward: req.user.ward }] });
		let products = await Produce.find().sort({ $natural: -1 });
		res.render("FO/approve-produce", { loggedUser: req.session.user, products: products });
	} catch (error) {
		res.status(400).send("Unable to get Produce list");
	}
});
// Single Produce Approve get route
router.get("/produce/approve/:id", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		const approveProduct = await Produce.findOne({ _id: req.params.id });
		res.render("FO/single-produce-approve", { loggedUser: req.session.user, product: approveProduct });
	} catch (error) {
		res.status(400).send("Unable to update produce");
	}
});

// Single Produce Approve post route
// Approve post route
router.post("/produce/approve", async (req, res) => {
	try {
		await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/approveproduce");
	} catch (error) {
		res.status(400).send("Unable to approve produce");
	}
});
module.exports = router;
