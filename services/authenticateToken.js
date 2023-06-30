const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");

// The secret keys and the expiration date of the tokens
require("dotenv").config();

const tokenSecret = process.env.TOKEN_SECRET;
const tokenSecretAdmin = process.env.TOKEN_SECRET_ADMIN;

const maxAge = 3 * 24 * 60 * 60;
const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  const type = req.cookies.type;

  if (!token) {
    return res.sendStatus(401);
  }

  let secretKey;
  if (type === "admin") {
    secretKey = tokenSecretAdmin;
  } else {
    return res.sendStatus(403); // إذا كان المستخدم ليس من نوع الإدارة، نعيد حالة الاستجابة 403 Forbidden
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = decoded;
    next();
  });
};

// Error detection detected and certified
module.exports = { authenticateToken };
