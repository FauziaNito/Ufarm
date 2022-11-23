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
			// Dashboard table lists
			let newUrbanFarmers = await Registration.find({ role: "urbanfarmer" }).sort({ $natural: -1 }).limit(15);
			let suspendedFarmers = await Registration.find({ status: "Inactive" }).sort({ $natural: -1 }).limit(6);

			console.log("These are the existing FarmerOnes", newUrbanFarmers);
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
				newFarmers: newUrbanFarmers,
				inactiveFarmers: suspendedFarmers,
				// title: "Reports",
				totalP: totalPoultry[0],
				totalH: totalHort[0],
				totalD: totalDairy[0],
				sales1: ward1Sales[0],
				sales2: ward2Sales[0],
				sales3: ward3Sales[0],
				sales4: ward4Sales[0],
				totalFarmerOnes,
				totalUbarnFarmers,
				totalGeneralPublic,
				// totalProduce,
			});
			// res.render("AO/AO-dashboard", {
			// 	loggedUser: req.session.user});
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
		res.status(400).send("Unable to get this FarmerOne");
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
	res.render("AO/reports", { loggedUser: req.session.user });
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
//Activity Reports
router.get("/reports", async (req, res) => {
	// req.session.user = req.user;
	// console.log("This is my searched Ward======", req.query.searchward);
	// res.render("AO/reports", { loggedUser: req.session.user });

	if (req.session.user.role == "agriculturalofficer") {
		try {
			console.log("This is the ward you're searching for========", req.query.searchward);
			// New
			// instantiate a crop variable you will use to select a crop.
			let selectedWard;
			if (req.query.searchward) selectedWard = req.query.searchward;
			console.log("This is the ward you're searching for========", selectedWard);
			// Query for returning all tonnage and revenue of a produce
			let returnedward = await Produce.find({ ward: selectedWard });

			// console.log("products from the db", goods)
			console.log("Ward from the db after search", returnedward);

			// New

			let totalProduce = await Produce.aggregate([
				{ $match: { ward: selectedWard } },
				{
					$group: {
						_id: "$ward",
						totalQuantity: { $sum: "$quantity" },
						totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } },
					},
				},
			]);
			console.log("Total Produce in a selected Ward", totalProduce);
			res.render("AO/reports", {
				title: "Reports",
				wards: returnedward,
				totalC: totalProduce[0],
				loggedUser: req.session.user,
			});
		} catch (error) {
			res.status(400).send("unable to find items in the database");
			console.log(error);
		}
	} else {
		res.send("This page is only accessed by Agric Officers");
	}
});
// // Activity Reports
// router.get("/reports", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
// 	req.session.user = req.user;
// 	if (req.user.role == "agriculturalofficer") {
// 		try {
// 			// New
// 			// instantiate a crop variable you will use to select a crop.
// 			let selectedProduce;
// 			if (req.query.searchProduce) selectedProduce = req.query.searchProduce;
// 			// Query for returning all tonnage and revenue of a produce
// 			let items = await Produce.find({ producename: selectedProduce });

// 			// console.log("products from the db", goods)
// 			console.log("products from the db after search", items);

// 			// New
// 			let totalCrop = await Produce.aggregate([
// 				{ $match: { producename: selectedProduce } },
// 				{
// 					$group: {
// 						_id: "$prodname",
// 						totalQuantity: { $sum: "$quantity" },
// 						totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } },
// 					},
// 				},
// 			]);
// 			console.log("Crop collections", totalCrop);
// 			res.render("AO/reports", {
// 				title: "Reports",
// 				products: items,
// 				totalC: totalCrop[0],
// 			});
// 		} catch (error) {
// 			res.status(400).send("unable to find items in the database");
// 			console.log(error);
// 		}
// 	} else {
// 		res.send("This page is only accessed by Agric Officers");
// 	}
// });
module.exports = router;
