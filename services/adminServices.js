const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models/products");
const multer = require('multer');
const path = require('path');
require("dotenv").config();
const tokenSecret = process.env.TOKEN_SECRET;
const Product = require('../models/products');




module.exports.addItem_post = async (req, res) => {
    const { nameProducts, price, Quantity , tag, description, status } = req.body;
      console.log(req.file);
    try {
        const item = await Product.create({
            nameProducts: nameProducts,
            price: price,
            Quantity: Quantity,
            Image: req.file.filename, // استخدام المسار المؤقت للصورة
            tag: tag,
            description: description,
            status: status,
        }); 
        console.log(item);
        res.status(201).json(item);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

module.exports.addItem_get = (req, res) => {
    res.render("Form_add_item", { title: "Add Item" });
};
  