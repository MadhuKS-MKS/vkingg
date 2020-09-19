const express = require("express");

const router = express.Router();
const {
  getProduct,
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  productPhotoUpload
} = require("../controller/product");

const advancedResults = require("../middleware/advancedResults");


const Products = require("../models/Product");
router.route("/photo").post(productPhotoUpload);
router
  .route("/")
  .get(advancedResults(Products, {
    path: "category",
    select: "catname",
  }), getProducts) //get all products
  .post(addProduct);

router
  .route("/:ProductId")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);


module.exports = router;