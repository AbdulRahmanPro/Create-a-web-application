const express = require('express');
const router = express.Router();
const services = require("../services/adminServices");
const path = require('path');   
const multer = require("multer");
const Product = require('../models/products');
const fs = require('fs-extra');
const mongoose = require('mongoose');   
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

const { body, param, validationResult } = require('express-validator');

router.put(
  '/editItem/:id',
  [
    param('id').isMongoId().withMessage('Invalid ID format'),
    body('name_type').notEmpty().withMessage('Name type is required'),
    body('value').notEmpty().withMessage('Value is required')
  ],
  async (req, res) => {
    const id = req.params.id;
    const { name_type, value } = req.body;

    // التحقق من وجود أخطاء في البيانات
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updateFields = {
        [name_type]: value
      };

      // التحقق من صحة المعرف
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        return res.status(400).json({ error: 'Invalid ID' });
      }
      if (name_type == "tag" ){
        if (value == "متوفر" && value == "غير متوفر" ){

            const result = await Product.findByIdAndUpdate(id, updateFields);
            console.log(result);
            if (!result) {
                return res.status(404).json({ error: 'Product not found' });
            }
            
      }

     }
        const result = await Product.findByIdAndUpdate(id, updateFields);
        console.log(result);
        
      res.redirect('/admin');
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);


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
router.get('/users', services.users_get);


module.exports = router;
