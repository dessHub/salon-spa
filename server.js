const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const ejs = require('ejs');
const flash = require('connect-flash');
const mongoose= require('mongoose');
const bodyParser=require('body-parser');
const fs = require('fs');
const multer = require('multer');

//mongoose.Promise = global.Promise;
const db      ='mongodb://localhost:27017/salonhunt';
mongoose.connect(db);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}));

// set static folder
app.use(express.static(__dirname + '/assets'));
app.use('/uploads', express.static('uploads'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/postservice', express.static('uploads'));



//Create EJS Engine view
app.set('view engine', 'html');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(flash());


const routes = require('./routes/index.js');
app.use(routes);

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Hurray am running on port ' + app.get('port'))
});
