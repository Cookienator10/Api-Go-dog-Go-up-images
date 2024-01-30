const express = require('express');
const path = require('path');
const multer = require('multer');



//initilizations
const app = express();

//settings
app.set('port', 3000);
app.set ('views', path.join(__dirname, 'views'));
app.set ('view engine', 'ejs');

//middelweares 
const storage = multer.diskStorage({
    destination:  path.join(__dirname, 'public/upload') ,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer( {
    storage: storage,
    dest: path.join(__dirname,'public/upload') ,
    limits:{filesize: 2000000},
    fileFilter: (req, file,cb) => {
     const  filetypes =  /jpeg|jpg|png|gif/;
     const mimetype = filetypes.test(file.mimetype);
     const extname = filetypes.test(path.extname(file.originalname));
      if (mimetype && extname)
      return cb(null, true);
    
      cb ('Error: selecciona una imagen validad. ')
    }
    
}).single('file')
app.use(upload);

//Routes
app.use(require('./routes/index.routes'));


//static files
app.use(express.static(path.join(__dirname, 'public')));


//start the server
app.listen (app.get('port'), () => {
    console.log(`server on port ${app.get ('port')}`);
});