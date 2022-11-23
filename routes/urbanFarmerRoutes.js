const express = require("express");
const router = express.Router();
const multer = require("multer");
const connectEnsureLogin = require("connect-ensure-login");

// Importing Models
const Produce = require("../models/ProduceUpload");
const Order = require("../models/Orders");

// image upload
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

var upload = multer({ storage: storage });

// Urban Farmer Produce Upload Route
router.get("/uploadproduce", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
	console.log("This is the Current User ", req.session.user);
	res.render("UF/produce-upload-form", { loggedUser: req.session.user });
});

// produce upload form post route
router.post("/uploadproduce", upload.single("imageupload"), async (req, res) => {
	console.log(req.body);
	try {
		const produce = new Produce(req.body);
		produce.imageupload = req.file.path;
		console.log("This is my produce", produce);
		await produce.save();
		res.redirect("/producelist");
	} catch (error) {
		res.status(400).send("Can't save this this Produce");
		console.log(error);
	}
});

// Urban Farmer Dashboard Routes
router.get("/UFdashboard", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	let farmer = req.session.user["_id"];
	//console.log("This is the logged user Id", farmer);
	if (req.user.role == "urbanfarmer") {
		try {
			// Dashboard lists
			let productsList = await Produce.find({ farmerid: farmer, status: "Approved" }).sort({ $natural: -1 }).limit(15);
			let ordersList = await Order.find({ farmerid: farmer, status: "Pending" }).sort({ $natural: -1 }).limit(5);
			let approvedProduce = await Produce.aggregate([
				{ $match: { $and: [{ farmerid: farmer }, { status: "Approved" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);
			let pendingProduce = await Produce.aggregate([
				{ $match: { $and: [{ farmerid: farmer }, { status: "Pending" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);
			let soldProduce = await Produce.aggregate([
				{ $match: { $and: [{ farmerid: farmer }, { availability: "N/A" }] } },
				{ $group: { _id: "$all", totalQuantity: { $sum: "$quantity" }, totalCost: { $sum: { $multiply: ["$unitprice", "$quantity"] } } } },
			]);

			let approved = approvedProduce[0];
			let pending = pendingProduce[0];
			let sold = soldProduce[0];
			// console.log("This is the product", approved.totalQuantity + pending.totalQuantity + soldProduce.totalQuantity);
			// let totalProduce = approved.totalQuantity + pending.totalQuantity + sold.totalQuantity;2
			// console.log("This is the product", totalProduce);
			// // let totalSales = approved.totalCost + pending.totalCost + sold.totalCost;

			res.render("UF/UF-dashboard", {
				loggedUser: req.session.user,
				approvedList: productsList,
				newOrders: ordersList,
				approved,
				pending,
				sold,
				// totalProduce,
				// totalSales,
			});
		} catch (error) {
			res.status(400).send("unable to find items in the database");
		}
	} else {
		res.send("This page is only accessed by Urban Farmers");
	}
	// res.render("UF/UF-dashboard", { loggedUser: req.session.user });
});

// Getting Produce uploaded List from Database
router.get("/producelist", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	try {
		// let orderedItems = Order.find({ farmerid: req.user._id });
		// console.log("This is the quantity of ordered items", orderedItems);
		let products = await Produce.find({ farmerid: req.user }).sort({ $natural: -1 });
		res.render("UF/produce-list", { loggedUser: req.session.user, products: products });
	} catch (error) {
		res.status(400).send("Unable to get Produce list");
	}
});

// Produce Update form get route for a particular id
router.get("/produce/update/:id", async (req, res) => {
	try {
		const updateProduct = await Produce.findOne({ _id: req.params.id });
		res.render("UF/produce-update", { loggedUser: req.session.user, product: updateProduct });
	} catch (error) {
		res.status(400).send("Unable to update produce");
	}
});

// Update post route
router.post("/produce/update", async (req, res) => {
	try {
		await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/producelist");
	} catch (error) {
		res.status(400).send("Unable to update produce");
	}
});

//delete Route
router.post("/produce/delete", async (req, res) => {
	try {
		await Produce.deleteOne({ _id: req.body.id });
		res.redirect("/producelist");
	} catch (error) {
		res.status(400).send("back");
	}
});

// Getting Approved Produce List from Database
router.get("/approvedlist", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	try {
		let products = await Produce.find({ farmerid: req.user }).sort({ $natural: -1 });
		res.render("UF/approved-produce-list", { loggedUser: req.session.user, products: products });
	} catch (error) {
		res.status(400).send("Unable to get Produce list");
	}
});

// Getting Produce availability form
router.get("/produce/available/:id", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		const availProduct = await Produce.findOne({ _id: req.params.id });
		res.render("UF/produce-availability", { loggedUser: req.session.user, availableItem: availProduct });
	} catch (error) {
		res.status(400).send("Unable to update produce");
	}
});

// Availability Post Route

router.post("/produce/available", async (req, res) => {
	try {
		await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/approvedlist");
	} catch (error) {
		res.status(400).send("Unable to Make this produce available");
	}
});
// Getting Order List from Database
router.get("/order", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.session.user = req.user;
	try {
		let orders = await Order.find({ farmerid: req.user }).sort({ $natural: -1 });
		res.render("UF/order-list", { loggedUser: req.session.user, orders: orders });
	} catch (error) {
		res.status(400).send("Unable to get order list");
	}
});

// Change order status form get route

router.get("/order/status/:id", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		const orderStatus = await Order.findOne({ _id: req.params.id });
		res.render("UF/order-status", { loggedUser: req.session.user, orderItem: orderStatus });
	} catch (error) {
		res.status(400).send("Unable to update produce");
	}
});
// Change order status post route
router.post("/order/status", async (req, res) => {
	try {
		await Order.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/order");
	} catch (error) {
		res.status(400).send("Unable to Change Order Status");
	}
});

module.exports = router;
