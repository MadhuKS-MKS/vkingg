const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
    },

    totalprice: {
        type: String,
        required: [true, "Please add rate"],
    },
    qty: {
        type: Number,
    },

    photo: {
        type: String,
        default: "no-photo.jpg",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    vendor: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Cart", CartSchema);