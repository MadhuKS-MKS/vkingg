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
const {
  protect,
  authorize
} = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");


const Products = require("../models/Product");
router.route("/photo").post(productPhotoUpload);
router
  .route("/")
  .get(advancedResults(Products, {
    path: "category",
    select: "catname",
  }), getProducts) //get all products
  .post(protect, authorize("vendor", "admin"), addProduct);

router
  .route("/:ProductId")
  .get(getProduct)
  .put(protect, authorize("vendor", "admin"), updateProduct)
  .delete(protect, authorize("vendor", "admin"), deleteProduct);


module.exports = router;