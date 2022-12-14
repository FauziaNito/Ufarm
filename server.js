// DEPENDENCIES
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/db");
const passport = require("passport");
const moment = require("moment");
//express session
const expressSession = require("express-session")({
	secret: "secret",
	resave: false,
	saveUninitialized: false,
});

// MODEL IMPORTING
// Import the user Model
const Registration = require("./models/user");

// ROUTES IMPORTING
// Importing Routes from other routes files
const registerRoutes = require("./routes/registrationRoutes");
const agriculturalOfficer = require("./routes/agriculturalOfficerRoutes");
const farmerOne = require("./routes/farmerOneRoutes");
const urbanFarmer = require("./routes/urbanFarmerRoutes");
const authenticationRoute = require("./routes/authenticationRoutes");
const generalPubliceRoutes = require("./routes/generalPublicRoutes");

// INSTANTIATIONS
const app = express();

// DATABASE CONNECTIONS
mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;

// Check connection
db.once("open", function () {
	console.log("Connected to MongoDB");
});
// Check for db errors
db.on("error", function (err) {
	console.error(err);
});

// CONFIGURATIONs
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.locals.moment = moment;
// app.set("views", [
// 	path.join(__dirname, "views"),
// 	path.join(__dirname, "views/AO"),
// 	path.join(__dirname, "views/FO"),
// 	path.join(__dirname, "views/UF"),
// 	path.join(__dirname, "views/site"),
// ]);

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(expressSession);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());

// ROUTES
app.use("/", registerRoutes);
app.use("/", agriculturalOfficer);
app.use("/", farmerOne);
app.use("/", urbanFarmer);
app.use("/", authenticationRoute);
app.use("/", generalPubliceRoutes);

/*For all Invalid Routes */
app.get("*", (req, res) => {
	res.send("404! This is an invalid URL");
});

// SERVER BOOTSTRAPPING
app.listen(3002, () => console.log("We are listening to port 3002"));
