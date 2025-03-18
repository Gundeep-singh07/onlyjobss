const express = require("express");
const router = express.Router();
const { getHelperResponse } = require("../controllers/helperController");

router.post("/chat", getHelperResponse);

module.exports = router;
