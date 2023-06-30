const express = require('express');
const router = express.Router();
const services = require("../services/adminServices");


/* GET users listing. */
router.get('/addItem', services.addItem_get);

module.exports = router;
