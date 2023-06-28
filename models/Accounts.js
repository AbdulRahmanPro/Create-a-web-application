const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'الرجاء ادخال اسم المستخدم'],
        unique: true,
        lowercase: true,
        
    },
    password: {
        type: String,
        required: [true, 'الرجاء ادخال كلمة المرور'],
        minlength: [6, 'كلمة المرور يجب ان تكون اكثر من 6 احرف']
    },
    email: {
        type: String,
        required: [true, 'الرجاء ادخال البريد الالكتروني'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'الرجاء ادخال بريد الكتروني صحيح']
    },
    birth_date: {
        type: Date,
        required: [true, 'الرجاء ادخال تاريخ الميلاد'],
    },

})

// fire a function before doc saved to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
}
)

// static method to login user
userSchema.statics.login = async function(username, password){ 
    const user = await this.findOne({ username })
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error('كلمة المرور غير صحيحة')
    }
    throw Error('اسم المستخدم غير صحيح')
}


const User = mongoose.model('user', userSchema)

module.exports = User;
