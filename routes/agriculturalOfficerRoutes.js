const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// Importing Models
const Produce = require("../models/ProduceUpload");
const Registration = require("../models/user");

// Agricultural Officer Dashboard Routes with Aggregations
router.get("/AOdashboard", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	if (req.user.role == "agriculturalofficer") {
		try {
			let totalHort = await Produce.aggregate([
				{ $match: { producecategory: "Horticulture" } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);
			let totalDairy = await Produce.aggregate([
				{ $match: { producecategory: "Dairy Products" } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);
			let totalPoultry = await Produce.aggregate([
				{ $match: { producecategory: "Poultry" } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);

			let ward1Sales = await Produce.aggregate([
				{ $match: { $and: [{ ward: "Ward 1" }, { availability: "N/A" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);
			let ward2Sales = await Produce.aggregate([
				{ $match: { $and: [{ ward: "Ward 2" }, { availability: "N/A" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);
			let ward3Sales = await Produce.aggregate([
				{ $match: { $and: [{ ward: "Ward 3" }, { availability: "N/A" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);
			let ward4Sales = await Produce.aggregate([
				{ $match: { $and: [{ ward: "Ward 4" }, { availability: "N/A" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);

			// let totalProduce = totalHort[0] + totalDairy[0] + totalPoultry[0];

			let totalFarmerOnes = await Registration.countDocuments({
				role: "farmerOne",
			});
			let totalUbarnFarmers = await Registration.countDocuments({
				role: "urbanfarmer",
			});
			let totalGeneralPublic = await Registration.countDocuments({
				role: "generalpublic",
			});

			console.log("Poultry collections", totalPoultry);
			console.log("Hort collections", totalHort);
			console.log("Dairy collections", totalDairy);
			console.log("FarmerOnes======================", totalFarmerOnes);
			console.log("Ward 1 Total Sales", ward1Sales);

			res.render("AO/AO-dashboard", {
				loggedUser: req.session.user,

				// title: "Reports",
				totalP: totalPoultry[0],
				totalH: totalHort[0],
				totalD: totalDairy[0],
				Sales1: ward1Sales[0],
				// Sales2: ward2Sales[0],
				// Sales3: ward3Sales[0],
				Sales4: ward4Sales[0],
				totalFarmerOnes,
				totalUbarnFarmers,
				totalGeneralPublic,
				// totalProduce,
			});
		} catch (error) {
			res.status(400).send("unable to find items in the database");
		}
	} else {
		res.send("This page is only accessed by Agric Officers");
	}
});
// Farmer One list
router.get("/FOlist", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		let registeredFarmerOnes = await Registration.find({ role: "farmerOne" }).sort({ $natural: -1 });
		console.log("These are the existing FarmerOnes", registeredFarmerOnes);
		res.render("AO/AO-fo-accounts", { loggedUser: req.session.user, farmerOnes: registeredFarmerOnes });
	} catch (error) {
		res.status(400).send("Unable to get FarmerOne list");
	}
	// res.render("AO/AO-fo-accounts");
});

// Farmer One Update get route for a particular id
router.get("/farmerone/update/:id", async (req, res) => {
	try {
		const updateFarmerOne = await Registration.findOne({ _id: req.params.id });
		res.render("AO/farmerOne-update", { loggedUser: req.session.user, farmerOne: updateFarmerOne });
	} catch (error) {
		res.status(400).send("Unable to update produce");
	}
});

// Farmer One Update post route
router.post("/farmerone/update", async (req, res) => {
	try {
		await Registration.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/FOlist");
	} catch (error) {
		res.status(400).send("Unable to update FarmerOne");
	}
});

// FarmerOne status update get route
router.get("/farmerone/status/:id", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		const appointFarmerOne = await Registration.findOne({ _id: req.params.id });
		res.render("AO/FO-status", { loggedUser: req.session.user, farmerOneStatus: appointFarmerOne });
	} catch (error) {
		res.status(400).send("Unable to Find User Status");
	}
});

// FarmerOne status update post route
router.post("/farmerone/status", async (req, res) => {
	try {
		await Registration.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/FOlist");
	} catch (error) {
		res.status(400).send("Unable to Change User Status");
	}
});
// Farmer One Activities
router.get("/FOactivities", (req, res) => {
	res.render("AO/AO-fo-activities", { loggedUser: req.session.user });
	// res.render("AO/AO-fo-activities");
});
// Ward Routes
router.get("/addward", (req, res) => {
	res.render("AO/ward", { loggedUser: req.session.user });
	// res.render("AO/ward");
});
// Testing layout Page
router.get("/layout", (req, res) => {
	res.render("AO/layout");
});

module.exports = router;
