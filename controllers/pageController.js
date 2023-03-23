exports.getAboutPage = (req, res) => {
    res.render('about');
  }

exports.getAddPage = (req, res) => {
    res.render('add');
  }

exports.getEditPage =  async (req, res) => {
    let id = req.params.id;
    var photo = await Photo.findById(id);
    res.render('edit', { photo });
  }