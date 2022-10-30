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
			// let totalFarmerOnes = await Registration.countDocuments({
			// 	"role": "farmerOne",
			// });

			// let ward1Sales = await Produce.aggregate([
			// 	{
			// 		$lookup: {
			// 			from: "Registration",
			// 			localFeild: "Ward",
			// 			foreignField: "Ward",
			// 			as: "wardMatch",
			// 		},
			// 	},
			// 	// { $match: { farmerWard: "Ward 1", availability: "N/A" } },
			// 	// { $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			// ]);

			console.log("Poultry collections", totalPoultry);
			console.log("Hort collections", totalHort);
			console.log("Dairy collections", totalDairy);
			// console.log("FarmerOnes", totalFarmerOnes);

			res.render("AO/AO-dashboard", {
				loggedUser: req.session.user,

				// title: "Reports",
				totalP: totalPoultry[0],
				totalH: totalHort[0],
				totalD: totalDairy[0],
				// userG1: totalFarmerOnes[0],
			});
		} catch (error) {
			res.status(400).send("unable to find items in the database");
		}
	} else {
		res.send("This page is only accessed by Agric Officers");
	}
});
// Farmer One list
router.get("/FOlist",connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
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
		await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/FOlist");
	} catch (error) {
		res.status(400).send("Unable to update FarmerOne");
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
