const mongoose = require('mongoose')


const products = new mongoose.Schema({
    nameProducts: {
        type: String,
        required: [true, 'عليك ادخال اسم المنتج'],
        unique: true,
        lowercase: true,
        
    },
    price: {
        type: Number,
        required: [true, 'عليك ادخال سعر المنتج'],
    },
    Quantity: {
        type: Number,
        required: [true, 'عليك ادخال الكمية المتوفرة'],
    },
    tag: {
        type: String,
        required: [true, 'عليك ادخال نوع المنتج او تصنيفه'],
    },
    Image:{
        type: String,
        required: true

    },
    description:{
        type:String
    },
    status:{
        type:String

    }
    

})

// fire a function before doc saved to db

const products_item = mongoose.model('products', products)

module.exports = products_item;
