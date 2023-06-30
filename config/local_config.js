const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// تعريف استراتيجية المصادقة الخاصة بـ Passport.js
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // اسم حقل اسم المستخدم في الجسم
      passwordField: 'password', // اسم حقل كلمة المرور في الجسم
    },
    (email, password, done) => {
      // قم بتنفيذ التحقق من هوية المستخدم هنا
      // واستدعاء done(err, user) لإرجاع النتيجة
    }
  )
);
