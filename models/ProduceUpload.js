const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema({
	farmerid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Registration",
	},
	producecategory: {
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
		type: String,
	},
	imageupload: {
		type: String,
	},
	producttype: {
		type: String,
	},
	farmername: {
		type: String,
		// type: mongoose.Schema.Types.ObjectId,
		// ref: "Registration", //Creating a relationship btn farmers in Registration collection & produce
	},
	phonenumber: {
		type: Number,
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
	email: {
		type: String,
		trim: true,
	},
	producedescription: {
		type: String,
	},
	status: {
		type: String,
		default: "Pending",
		enum: ["Pending", "Approved", "Rejected"],
	},
	availability: {
		//
		type: String,
		default: "available",
		enum: ["available", "booked", "N/A"],
	},
});

module.exports = mongoose.model("Produce", produceSchema);
