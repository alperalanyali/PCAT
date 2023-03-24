const Photo = require('../models/photo');
const fs = require('fs');
const mongoose = require('mongoose');



exports.getAllPhotos = async (req, res) => {
    // console.log(req.query);
    const page = req.query.page || 1;
    const photoPerPage = 2;
    const totalPhotos = await Photo.find().countDocuments(); 
    const photos = await Photo.find({}).sort("-dateCreated").limit(photoPerPage).skip((page-1)*photoPerPage);
    res.render('index', { photos:photos,current:page,pages:Math.ceil((totalPhotos / photoPerPage)) });
    // const photos = await Photo.find({}).sort("-dateCreated");
    // res.render('index', { photos });
  }

  exports.getPhoto = async (req, res) => {
    console.log(req.params.id);
    let id = req.params.id;
    var photo = await Photo.findById(id);
    res.render('photo', { photo });
  }

  exports.createPhoto = async (req, res) => {
    //Eğer klasör yoksa oluşturacak
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    // Yükeldiğimiz dosyayı yakalayıp isteiğimiz bilgileri değişkenleri aktarıyoruz
    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;
  
    // Yakaladığımız dosyayı .mv metodu ile yukarda belirlediğimiz path'a taşıyoruz. Dosya taşıma işlemi sırasında hata olmadı ise req.body ve içerisindeki image'nin dosya yolu ve adıyla beraber database kaydediyoruz
    uploadeImage.mv(uploadPath, async (err) => {
      if (err) console.log(err);    // Bu kısımda önemli olan add.ejs'nin içerisine form elemanı olarak encType="multipart/form-data" atribute eklemek
      await Photo.create({
        ...req.body,
        image: '/uploads/' + uploadeImage.name,
      });
    });
    res.redirect('/');
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
    // if(fs.existsSync(deleteImage)){
      fs.unlinkSync(deleteImage);   
    // }

     await Photo.findByIdAndDelete(photo._id);
    res.redirect('/');
  }