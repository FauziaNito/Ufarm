const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const Produce = require("../models/ProduceUpload");
const Registration = require("../models/user");
const Order = require("../models/Orders");

// Farmer One Dashboard Routes
router.get("/FOdashboard", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	let farmerWard = req.user["ward"];
	console.log("This is your FarmerOne Ward", farmerWard);
	if (req.user.role == "farmerOne") {
		try {
			let activeFarmers = await Registration.countDocuments({ role: "urbanfarmer", ward: farmerWard, status: "Active" });
			let inactiveFarmers = await Registration.countDocuments({ role: "urbanfarmer", ward: farmerWard, status: "Inactive" });
			let notAppointedFarmers = await Registration.countDocuments({ role: "urbanfarmer", ward: farmerWard, status: "Not appointed" });
			let totalUsers = activeFarmers + inactiveFarmers + notAppointedFarmers;
			// let approvedProduce = await Produce.countDocuments({ role: "urbanfarmer", ward: farmerWard, status: "Approved" });

			console.log("These are the registered users", totalUsers);

			// Dashboard lists
			let newUrbanFarmers = await Registration.find({ role: "urbanfarmer", ward: farmerWard }).sort({ $natural: -1 }).limit(15);
			let newProducts = await Produce.find({ status: "Pending", ward: farmerWard }).sort({ $natural: -1 }).limit(15);
			let newOrders = await Order.find({ orderward: farmerWard }).sort({ $natural: -1 }).limit(5);

			let approvedProduce = await Produce.aggregate([
				{ $match: { $and: [{ ward: farmerWard }, { status: "Approved" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);

			let pendingProduce = await Produce.aggregate([
				{ $match: { $and: [{ ward: farmerWard }, { status: "Pending" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);
			let soldProduce = await Produce.aggregate([
				{ $match: { $and: [{ ward: farmerWard }, { status: "Approved" }, { status: "Approved" }, { availability: "N/A" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);
			let approved = approvedProduce[0];
			let pending = pendingProduce[0];
			let sold = soldProduce[0];
			// let totalProduce = approved.totalQuantity + pending.totalQuantity + sold.totalQuantity;
			// let totalSales = approved.totalCost + pending.totalCost + sold.totalCost;

			res.render("FO/FO-dashboard", {
				loggedUser: req.user,
				newFarmers: newUrbanFarmers,
				pendingProduce: newProducts,
				orders: newOrders,
				activeFarmers,
				inactiveFarmers,
				notAppointedFarmers,
				totalUsers,
				approved,
				pending,
				sold,
				// totalProduce,
				// totalSales,
			});
		} catch (error) {
			res.status(400).send("unable to find items in the database");
		}
	}
});

// List of Urban Farmer Route
router.get("/UFlist", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	farmerWard = req.user["ward"];
	try {
		// find([{ role: "urbanfarmer" }, { ward: req.user.ward }]);
		let registeredUrbanFarmers = await Registration.find({ role: "urbanfarmer", ward: farmerWard }).sort({ $natural: -1 });
		console.log("These are the existing Urban Farmers", registeredUrbanFarmers);
		res.render("FO/FO-ub-accounts", { loggedUser: req.session.user, urbanFarmers: registeredUrbanFarmers });
	} catch (error) {
		res.status(400).send("Unable to get Urban Farmers list");
	}
	// res.render("FO/FO-ub-accounts", { loggedUser: req.session.user });
});

// Urban Farmer Details update get route
router.get("/urbanfarmer/update/:id", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		const updateFarmer = await Registration.findOne({ _id: req.params.id });
		res.render("FO/urbanFarmer-update", { loggedUser: req.session.user, urbanFarmer: updateFarmer });
	} catch (error) {
		res.status(400).send("Unable to get this Urban Farmer");
	}
});

// Urban Farmer Update post route
router.post("/urbanfarmer/update", async (req, res) => {
	try {
		await Registration.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/UFlist");
	} catch (error) {
		res.status(400).send("Unable to update this Urban Farmer");
	}
});

// Urban Farmer status update get route
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

// Urban Farmer Order List from Database
router.get("/farmerorderlist", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	try {
		let orders = await Order.find({ orderward: req.user.ward }).sort({ $natural: -1 });
		res.render("FO/UF-order-list", { loggedUser: req.session.user, orders: orders });
	} catch (error) {
		res.status(400).send("Unable to get order list");
	}
});

module.exports = router;
