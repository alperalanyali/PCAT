const Photo = require('../models/photo');
const fs = require('fs');
const mongoose = require('mongoose');



exports.getAllPhotos = async (req, res) => {
    const photos = await Photo.find({});
  
    res.render('index', { photos });
  }

  exports.getPhoto = async (req, res) => {
    console.log(req.params.id);
    let id = req.params.id;
    var photo = await Photo.findById(id);
    res.render('photo', { photo });
  }

  exports.createPhoto = async (req, res) => {
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
  }


  exports.updatePhoto = async (req, res) => {
    let id = req.params.id;
    var photo = await Photo.findById(id);
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    
    res.redirect(`/photos/${req.params.id}`)
  }

  exports.deletePhoto = async (req,res)=>{
    let id = req.params.id;  
  
    const photo = await Photo.findById(id);  
    let deleteImage = __dirname+ "/public/"+photo.image;
    fs.unlinkSync(deleteImage);
     await Photo.findByIdAndDelete(photo._id);
    res.redirect('/');
  }