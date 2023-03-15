const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//connect DB

mongoose.connect(
  'mongodb+srv://alanyalialper:1234@pcat.xdwxvcc.mongodb.net/?retryWrites=true&w=majority'
);

const PhotoSchema = Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

Photo.create({
  title: 'Photo Title 2',
  description: 'Lorem ipsum dolor sit amet, consectetur adip',
}).then(()=>{
  console.log("Photo")
});
