const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;



const postchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },


  image: {
    type: String,
    required: false
  }
});


module.exports = mongoose.model('post',postchema)