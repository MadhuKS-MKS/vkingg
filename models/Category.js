const mongoose = require("mongoose");


const categorySchema = mongoose.Schema({
  catname: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    default: "no-photo.jpg",
  },

});

// delete cascade


module.exports = mongoose.model("Category", categorySchema);