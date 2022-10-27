const express = require("express");
const router = express.Router();

// Importing Models
const Produce = require("../models/ProduceUpload");

// Agricultural Officer Dashboard Routes with Aggregations
router.get("/AOdashboard", async (req, res) => {
		req.session.user = req.user;
	if (req.user.role == "agriculturalofficer") {
		try {
			let totalHort = await Produce.aggregate([
				{ $match: { producecategory: "Horticulture" } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" },
				totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);
			// let totalDairy = await Produce.aggregate([
			// 	{ $match: { producecategory: "Dairy products" } },
			// 	{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" },
			// 	totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			// ]);
			// let totalPoultry = await Produce.aggregate([
			// 	{ $match: { producecategory: "Poultry" } },
			// 	{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			// ]);

			// console.log("Poultry collections", totalPoultry);
			console.log("Hort collections", totalHort);
			// console.log("Dairy collections", totalDairy);
			// console.log("Produce collections", totalProduce);

			res.render("AO/AO-dashboard", { loggedUser: req.session.user },{
				// title: "Reports",
				// totalP: totalPoultry[0],
				totalH: totalHort[0],
				// totalD: totalDairy[0],
				// totalPro: totalProduce[0],
			});
		} catch (error) {
			res.status(400).send("unable to find items in the database");
		}
	} else {
		res.send("This page is only accessed by Agric Officers");
	}
	// res.render("AO/AO-dashboard", { loggedUser: req.session.user });
	// res.render("AO/AO-dashboard");
});
// Farmer One list
router.get("/FOlist", (req, res) => {
	res.render("AO/AO-fo-accounts", { loggedUser: req.session.user });
	// res.render("AO/AO-fo-accounts");
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
