const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const port = 3000;
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const multer = require('multer');
const methodOverride = require('method-override');






// Connect to MongoDB

const app = express();
app.use(function (req, res, next) {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    console.log("لا يمكن تنفيذ الأكواد، لم يتم الاتصال بقاعدة البيانات");
  }
});
// view engine setup
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
mongoose
  .connect("mongodb+srv://maynkraftalhosni:reem123123@cluster0.ivva45d.mongodb.net/Database_Account?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("تم الاتصال بنجاح");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
