const express = require("express");
const router = express.Router();


// Shopping Cart Route
router.get("/shoppingcart", (req, res) => {
	res.render("site/shoppingcart");
});

// Single Item Route
router.get("/singleitem", (req, res) => {
	res.render("site/singel-item");
});

module.exports = router;