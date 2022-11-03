const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const Produce = require("../models/ProduceUpload");
const Registration = require("../models/user");

// Farmer One Dashboard Routes
router.get("/FOdashboard", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	let farmerWard = req.user["ward"];
	console.log("This is your FarmerOne Ward", farmerWard);
	if (req.user.role == "farmerOne") {
		try {
			let activeFarmers = await Registration.countDocuments({ role: "urbanfarmer", ward: farmerWard, status: "Active" });
			let inactiveFarmers = await Registration.countDocuments({ role: "urbanfarmer", ward: farmerWard, status: "Inactive" });
			let NotAppointedFarmers = await Registration.countDocuments({ role: "urbanfarmer", ward: farmerWard, status: "Not appointed" });
			
			// let approvedProduce = await Produce.countDocuments({ role: "urbanfarmer", ward: farmerWard, status: "Approved" });

			let approvedProduce = await Produce.aggregate([
				{ $match: { $and: [{ ward: farmerWard }, { status: "Approved" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, 
				totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);

			let pendingProduce = await Produce.aggregate([
				{ $match: { $and: [{ ward: farmerWard }, { status: "Pending" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },

			]);
			let soldProduce = await Produce.aggregate([
				{ $match: { $and: [{ ward: farmerWard }, { status: "Approved" }, { status: "Approved" }, { availability : "N/A"}] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);
			console.log("This is your Total approved produce", approvedProduce);

			
			res.render("FO/FO-dashboard", {
				loggedUser: req.user,
				activeFarmers,
				inactiveFarmers,
				NotAppointedFarmers,
				approved: approvedProduce[0],
				pending: pendingProduce[0],
				sold: soldProduce[0],
			});
		} catch (error) {
			res.status(400).send("unable to find items in the database");
		}
	}
});

// List of Urban Farmer Route
router.get("/UFlist", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		// find([{ role: "urbanfarmer" }, { ward: req.user.ward }]);
		let registeredUrbanFarmers = await Registration.find({ role: "urbanfarmer" }).sort({ $natural: -1 });
		console.log("These are the existing Urban Farmers", registeredUrbanFarmers);
		res.render("FO/FO-ub-accounts", { loggedUser: req.session.user, urbanFarmers: registeredUrbanFarmers });
	} catch (error) {
		res.status(400).send("Unable to get Urban Farmers list");
	}
	// res.render("FO/FO-ub-accounts", { loggedUser: req.session.user });
});
// Urban Farmer status Change get route
router.get("/urbanfarmer/status/:id", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		const appointUrbanFarmer = await Registration.findOne({ _id: req.params.id });
		res.render("FO/UF-status", { loggedUser: req.session.user, UrbanFarmerStatus: appointUrbanFarmer });
	} catch (error) {
		res.status(400).send("Unable to find User Status");
	}
});

// Urban Farmer status update post route
router.post("/urbanfarmer/status", async (req, res) => {
	try {
		await Registration.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/UFlist");
	} catch (error) {
		res.status(400).send("Unable to Change User Status");
	}
});

// list of produce awaiting Approval
router.get("/approveproduce", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	console.log("Logged In this FarmerOne", req.user);

	try {
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
