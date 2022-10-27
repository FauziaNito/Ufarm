const express = require("express");
const router = express.Router();

// Index Page
router.get("/", (req, res) => {
	res.render("site/index");
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
