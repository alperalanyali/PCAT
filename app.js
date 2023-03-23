const express = require('express');
const path = require('path');
const fs = require('fs');

const ejs = require('ejs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const Photo = require('./models/photo');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'))

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

app.get('/', async (req, res) => {
  const photos = await Photo.find({});

  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/photos/:id', async (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;
  var photo = await Photo.findById(id);
  res.render('photo', { photo });
});

app.post('/photos', async (req, res) => {
  const { title, description, imageUrl } = req.body;
  const uploadDir = 'public/uploads/';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let image = req.files.image;
  let path = __dirname + '/public/uploads/' + image.name;

  image.mv(path, async () => {
    const newPhoto = new Photo({
      title: title,
      description: description,
      image: '/uploads/' + image.name,
    });
    await newPhoto.save();
    console.log(newPhoto);
    res.redirect('/');
  });
  // res.json({message:"dsfafsfs"})
});

app.get('/photos/edit/:id', async (req, res) => {
  let id = req.params.id;
  var photo = await Photo.findById(id);
  res.render('edit', { photo });
});

app.put('/photos/:id', async (req, res) => {
  let id = req.params.id;
  var photo = await Photo.findById(id);
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  
  res.redirect(`/photos/${req.params.id}`)
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
