const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');

const Photo = require('./models/photo')


const app = express();

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


mongoose.connect(
  'mongodb+srv://alanyalialper:1234@pcat.xdwxvcc.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>{
  console.log('MongoDb bağlantı kuruldu')
});

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  
  res.render('index',{photos});
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/photos/:id',async (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;
  var photo = await Photo.findById(id);
  res.render('photo',{photo});
});


app.post('/photos', async (req, res) => {
  const {title,description,imageUrl} = req.body
  const newPhoto = new Photo({
    title:title,
    description:description,
    imageUrl:imageUrl
  })   
  await newPhoto.save();  
  console.log(newPhoto)
  res.redirect('/')
  // res.json({message:"dsfafsfs"})
});


const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);

});
