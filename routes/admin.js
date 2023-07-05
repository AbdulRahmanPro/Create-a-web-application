const express = require('express');
const router = express.Router();
const services = require("../services/adminServices");
const path = require('path');   
const multer = require("multer");
const Product = require('../models/products');
const fs = require('fs-extra');
// متغيرات لانشاء المخطط


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // مسار حفظ الصورة
    },
    filename: function (req, file, cb) {
       let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // اسم الصورة
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG and PNG images are allowed'));
        }
    }
}); // تحديد اسم الصورة

/* GET users listing. */
router.put('/editItem/:id', (req, res) => {
    const id = req.params.id;
    console.log(412432);
});

router.delete('/deleteItem/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);    
    Product.findById(id).then((Product)=>{
        console.log(Product);
        fs.unlink(`uploads/${Product.Image}`, (err) => {
            
        });
    
    }).catch((err)=>{
        console.log(err);
    }) 
    Product.findOneAndDelete({ _id: id })
      .then(deletedProduct => {
        if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
      });
    });



router.post('/addItem', upload.single('Image'), services.addItem_post);   
router.get('/addItem', services.addItem_get);


module.exports = router;
