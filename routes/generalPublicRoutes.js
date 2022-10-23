const express = require("express");
const router = express.Router();


// Shopping Cart Route
router.get("/shoppingcart", (req, res) => {
	res.render("site/shoppingcart");
});

module.exports = router;