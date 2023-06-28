var express = require('express');
var router = express.Router();
const services = require('../services/authServices');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});


router.post('/register', services.register_post);

router.post('/login', services.login_post);

router.get('/login', (req, res, next)=> {
  res.render('LoginPage', { title: 'Login' });
})
router.get('/register', (req, res, next)=> {
  res.render('RegisterPage', { title: 'Register' });
})
router.get('/admin', (req, res, next)=> {
  res.render('IndexAdmin', { title: 'Admin' });
})
module.exports = router;
