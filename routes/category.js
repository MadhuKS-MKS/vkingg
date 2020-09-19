const express = require("express");

const router = express.Router();
const {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  getCategory,
  getCategoryProduct
} = require("../controller/category");

const advancedResults = require("../middleware/advancedResults");

const Category = require("../models/Category");

router
  .route("/")
  .get(
    advancedResults(Category, {
      path: "products",
      select: "name",
    }),
    getCategories
  )
  .post(addCategory);

router
  .route("/:categoryId")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

router.route("/:categoryId/products").get(getCategoryProduct);
module.exports = router;