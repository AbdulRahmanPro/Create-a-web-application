const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models/Accounts");
//  The secret key and the expiration date of the token
require("dotenv").config();

const tokenSecret = process.env.TOKEN_SECRET_USER;
const tokenSecretAdmin = process.env.TOKEN_SECRET_ADMIN;


const maxAge = 3 * 24 * 60 * 60;

//  Error detection detected and certified
const handleErrors = async (err) => {
    await console.log(err.message);
    let errors = { email: "", password: "" };
    if (err.message === "بريد الكتروني غير صحيح") {
      errors.email = "بريد الكتروني غير صحيح";
    }
    if (err.message === "كلمة المرور غير صحيحة") {
      errors.password = "كلمة المرور غير صحيحة";
    }
    if (err.message.includes("User validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  };
  const cratetoken = (id, symbol) => {
    return jwt.sign({ id }, symbol, {
      expiresIn: maxAge,
    });
  };
  const login_post = (req, res) => {
    db.login(username, password)
    .then((result) => {
      res.cookie("type", "user")
      const token = cratetoken(result._id, tokenSecret);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
      res.status(200).json({ succeed: "تم تسجيل الدخول", id: result._id });
    })
    .catch((err) => {
      const error = handleErrors(err);
      res.status(400).json({ error: err.message });
    });
  }
module.exports.register_post = async (req, res) => {
    const { username, password, email, birth_date } = req.body;
    try {
      const Verify_email = await db.findOne({ email });
      if (Verify_email) {
        console.log("هاذا البريد الكتروني مستعمل");
        res.status(409).json({ error: "هاذا البريد الكتروني مستعمل" });
      } else {
        const User = await db.create({
          username,
          password,
          email,
          birth_date,
        });
        res.cookie("type", "user")
        const token = cratetoken(User._id, tokenSecret);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
        res.status(201).json({ succeed: "نجح انشاء الحساب", id: User._id });
      }
    } catch (err) {
      const error = await handleErrors(err);
      res.status(400).json({ error });
    }
};
module.exports.login_post = async (req, res) => { 
  const { username, password } = req.body;
  try {
    if(username ==="admin" && password === "admin"){
      res.cookie("type", "admin")
      const token = cratetoken("admin", tokenSecretAdmin);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
      res.status(200).json({ admin: "isTrue",id: "admin"});
    }else{
      db.login(username, password)
      .then((result) => {
        res.cookie("type", "user")
        const token = cratetoken(result._id,tokenSecretAdmin);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
        res.status(200).json({ succeed: "تم تسجيل الدخول", id: result._id });
      })
      .catch((err) => {
        const error = handleErrors(err);
        res.status(400).json({ 4: err.message });
      });
    }
  } catch (err) {
    console.log(err)
    const error = await handleErrors(err);
    res.status(400).json({ error });
  }
}