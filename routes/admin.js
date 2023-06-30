const express = require('express');
const router = express.Router();
const services = require("../services/adminServices");
const path = require('path');   
const multer = require("multer");
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
router.post('/addItem', upload.single('Image'), services.addItem_post);   
router.get('/addItem', services.addItem_get);


module.exports = router;
