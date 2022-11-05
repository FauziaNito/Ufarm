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
		type: String,
		required: true,
	}
});

module.exports = mongoose.model("Order", orderSchema);