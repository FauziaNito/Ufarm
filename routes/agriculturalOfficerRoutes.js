const express = require('express');
const router = express.Router();


// Agricultural Officer Dashboard Routes
router.get("/AOdashboard", (req, res) => {
	res.render("AO/AO-dashboard");
});

module.exports = router;