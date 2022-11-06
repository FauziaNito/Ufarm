const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// Importing Models
const Produce = require("../models/ProduceUpload");
const Registration = require("../models/user");
const Order = require("../models/Orders");

// Index Page
router.get("/", async (req, res) => {
	req.session.user = req.user;
	try {
		let products = await Produce.find({ Status: "Approved" }).sort({ $natural: -1 });

		res.render("site/index",{loggedUser: req.session.user, products: products} );
	} catch (error) {
		res.status(400).send("Unable to get Produce list");
	}
	
});

// Single Item Route
router.get("/singleitem/:id",connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	const Customer = req.user["firstname"];
	console.log("Our Buyer is ",Customer);
	try {
		if ((req.user.role = "generalpublic")) {
			const singleProduct = await Produce.findOne({ _id: req.params.id });
			res.render("site/single-item", { loggedUser: req.session.user, singleItem: singleProduct });
		} else {
			res.send("You have to be Logged in as a Buyer to complete your Order");
		}
	} catch (error) {
		res.status(400).send("Unable to get this Item produce");
	}
	
});

// Order Form Post route
router.post("/order", async (req, res) => {
	req.session.user = req.user;
	console.log(req.body);
	try {
		if ((req.user.role = "generalpublic")) {
			const order = new Order(req.body);
			await order.save();
			res.redirect("/");
		}else{
			res.send("You have to be Logged in as a Buyer to complete your Order");
		}
	} catch (error) {
		res.status(400).send("Sorry Can't Complete this Order");
		console.log(error);
	}
});

// Shopping Cart Route
router.get("/shoppingcart", (req, res) => {
	res.render("site/shoppingcart");
});




module.exports = router;
