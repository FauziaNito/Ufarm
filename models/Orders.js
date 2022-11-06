const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	produceid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Produce",
	},
	farmerid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Produce",
	},
	customerid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Registration",
	},
	producename: {
		type: String,
		required: true,
	},
	customername: {
		type: String,
		required: true,
	},
	phonenumber: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
	city: {
		type: String,
		required: true,
	},
	residentarea: {
		type: String,
		required: true,
	},
	orderquantity: {
		type: Number,
		required: true,
	},
	units: {
		type: String,
		required: true,
	},
	unitprice: {
		type: String,
		required: true,
	},
	availablequantity: {
		type: Number,
		required: true,
	},
	// imageupload: {
	// 	type: String,
	// },
	status: {
		type: String,
		default: "Pending",
		enum: ["Pending", "Completed"],
	},
});

module.exports = mongoose.model("Order", orderSchema);