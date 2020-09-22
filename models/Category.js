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

// Cascade delete 
categorySchema.pre("remove", async function (next) {
  console.log(`Product being removed from Course ${this._id}`);
  await this.model("Product").deleteMany({
    category: this._id
  });
  next();
});

module.exports = mongoose.model("Category", categorySchema);