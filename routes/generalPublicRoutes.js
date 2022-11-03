const express = require("express");
const router = express.Router();

// Importing Models
const Produce = require("../models/ProduceUpload");

// Index Page
router.get("/", async (req, res) => {
	try {
		let products = await Produce.find({ Status: "Approved" }).sort({ $natural: -1 });

		res.render("site/index",{products: products} );
	} catch (error) {
		res.status(400).send("Unable to get Produce list");
	}
	
});

// Shopping Cart Route
router.get("/shoppingcart", (req, res) => {
	res.render("site/shoppingcart");
});

// Single Item Route
router.get("/singleitem", (req, res) => {
	res.render("site/singel-item");
});

module.exports = router;
