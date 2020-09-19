const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productname: {
        type: String,
        trim: true,
        required: [true, "Please add a course title"],
    },
    desc: {
        type: String,
        required: [true, "Please add a description"],
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Please add a category"],
    },
    price: {
        type: String,
        required: [true, "Please add Price"],
    },
    stock: {
        type: Number,
        required: [true, "Please add in-stock"],
    },
    photo: {
        type: String,
        default: "no-photo.jpg",
    },
    offer: {
        status: {
            type: String,
            enum: [true, false],
            default: false
        },
        percentage: {
            type: Number,
        }

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("Product", ProductSchema);