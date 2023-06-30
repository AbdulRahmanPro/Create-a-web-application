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
const data = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'عدد المستخدمين',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  // خيارات المخطط
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  module.exports.addItem_get_post = async (req, res) => {
    try {
      const products = await Product.find({}); // استرجاع جميع المنتجات

    // استخدم دالة map() لتحويل النتيجة إلى مصفوفة
    const productArray = products.map(product => product.toObject());
  
      // استخدام حلقة for للاستفادة من المحتويات
      for (let i = 0; i < productArray.length; i++) {
        const product = productArray[i];
        // استخدم المتغير "product" هنا للاستفادة من محتويات كل سجل في المجموعة
        console.log(product);
      }
    }
    catch (err) {
      console.log(err);
    }
  };

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

module.exports.addItem_get = async(req, res) => {
  try {
    const products = await Product.find({}); // استرجاع جميع المنتجات

  // استخدم دالة map() لتحويل النتيجة إلى مصفوفة
  const productArray = products.map(product => product.toObject());
    res.render('Form_add_item', { title:"Add Item",products: productArray });
    // استخدام حلقة for للاستفادة من المحتويات

  }
  catch (err) {
    console.log(err);
  }
};

  