const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		trim: true,
		// required: true,
	},
	lastname: {
		type: String,
		trim: true,
		// required: true,
	},
	uniquenumber: {
		type: String,
		trim: true,
		// required: true,
		unique: true,
	},
	password: {
		type: String,
		trim: true,
		// required: true,
	},
	role: {
		type: String,
		trim: true,
		required: true,
	},
	ninnumber: {
		type: String,
		trim: true,
	},
	phonenumber: {
		type: Number,
		trim: true,
	},
	ward: {
		type: String,
		trim: true,
	},
	residenttype: {
		type: String,
		trim: true,
	},
	periodofstay: {
		type: String,
		trim: true,
	},
	regdate: {
		type: Date,
		trim: true,
	},
	birthdate: {
		type: Date,
		trim: true,
	},
	gender: {
		type: String,
		trim: true,
	},
	streetname: {
		type: String,
		trim: true,
	},
	housenumber: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
	},
	status: {
		type: String,
		default: "Not appointed",
		enum: ["Not appointed","Active", "Inactive"],
	},
	activity: [
		{
			type: String,
			trim: true,
		},
	],
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: "uniquenumber",
});
module.exports = mongoose.model("Registration", userSchema);
