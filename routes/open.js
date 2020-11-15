const express = require('express');
const checkToken = require('../index');
const router = express.Router();


//stuff
router.get("/test", checkToken,async (req, res) => {
    res.status(200).json(req.userInfo);
});


module.exports = router;