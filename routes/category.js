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
const {
  protect,
  authorize
} = require("../middleware/auth");
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
  .post(protect, authorize("admin"), addCategory);

router
  .route("/:categoryId")
  .get(getCategory)
  .put(protect, authorize("admin"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory);

router.route("/:categoryId/products").get(getCategoryProduct);
module.exports = router;