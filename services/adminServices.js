const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models/Accounts");
//  The secret key and the expiration date of the token
require("dotenv").config();
const tokenSecret = process.env.TOKEN_SECRET;

module.exports.addItem_get = (req, res) => {
    res.render("./partials/admin/Form_add_item");
};