const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  title: String,
  description: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Photo", PhotoSchema);

module.exports = Post;