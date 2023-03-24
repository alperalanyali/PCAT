const express = require('express');
const path = require('path');
const fs = require('fs');

const ejs = require('ejs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const Photo = require('./models/photo');
const  photoController= require('./controllers/photoController');
const pageController = require('./controllers/pageController');
const app = express();

app.set('view engine', 'ejs');
//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))

mongoose
  .connect(
    'mongodb+srv://alanyalialper:1234@pcat.xdwxvcc.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('MongoDb bağlantı kuruldu');
  });




//ROUTES
app.get('/',photoController.getAllPhotos );
app.get('/photos/:id',photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete("/photos/:id",photoController.deletePhoto);

app.get('/about',pageController.getAboutPage );
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id',pageController.getEditPage);









const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
