const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema({
	producecode: {
		type: String,
		trim: true,
		required: true,
	},
	producename: {
		type: String,
		required: true,
	},
	units: {
		type: String,
	},
	regdate: {
		type: Date,
	},
	quantity: {
		type: Number,
		required: true,
		trim: true,
	},
	currency: {
		type: String,
		required: true,
	},
	unitprice: {
		type: Number,
		trim: true,
	},
	unitprice: {
		type: Number,
		trim: true,
	},
	totalprice: {
		type: Number,
		trim: true,
		required: true,
	},
	modeofdelivery: {
		type: String,
	},
	modeofpayment: {
		type: Number,
	},
	imageupload: {
		type: String,
	},
	producttype: {
		type: String,
	},
	farmername: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Registration", //Creating a relationship btn farmers in Registration collection & produce
	},
	ward: {
		type: String,
		required: true,
	},
	streetname: {
		type: String,
	},
	housenumber: {
		type: String,
	},
	status: {
		type: String,
		default: "Pending",
		enum: ["Pending", "Approved"],
	},
});

module.exports = mongoose.model("Produce", produceSchema);
