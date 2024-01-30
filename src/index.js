const express = require('express');
const path = require('path');

//initilizations
const app = express();

//settings
app.set('port', 3000);
app.set ('views', path.join(__dirname, 'views'));
app.set ('view engine', 'ejs');

//routes
app.get('/', (req, res)  =>{
    res.render('index');
});

//start the server
app.listen (app.get('port'), () => {
    console.log(`server on port ${app.get ('port')}`);
});