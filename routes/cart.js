const express = require("express");

const router = express.Router();
const {
    getCart,
    getCarts,
    addCart,
    deleteCart,
    updateCart,
} = require("../controller/product");
const {
    protect,
    authorize
} = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router.use(protect);
router.use(authorize("user"));

const Cart = require("../models/Cart");

router
    .route("/")
    .get(advancedResults(Cart, {
        path: "product",
    }), getCart) //get all products
    .post(addCart);

router
    .route("/:cartId")
    .get(getCart)
    .put(updateCart)
    .delete(deleteCart);


module.exports = router;