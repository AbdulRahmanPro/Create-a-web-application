var express = require('express');
var router = express.Router();
const services = require('../services/authServices');
const { authenticateToken } = require("../services/authenticateToken")

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('Home', { title: 'Express' });
});

router.post('/register', services.register_post);
router.post('/login', services.login_post);
router.get('/login', (req, res, next) => {
  res.render('LoginPage', { title: 'Login' });
});
router.get('/register', (req, res, next) => {
  res.render('RegisterPage', { title: 'Register' });
});

// حماية المسار /admin باستخدام authenticateToken

router.get('/admin', authenticateToken, (req, res, next) => {
  res.render('IndexAdmin', { title: 'Admin' });
});


module.exports = router;
