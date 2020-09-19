const path = require("path");
// const ErrorResponse = require("../utils/errorResponse");

const Category = require("../models/Category");
const Products = require("../models/Product");

const asyncHandler = require("../middleware/async");

// @desc      Get categorys
// @route     GET /api/category/
// @access    Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single category
// @route     GET /api/category/:categoryId
// @access    Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.find({
    _id: req.params.categoryId
  });

  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc      Add category
// @route     POST /api/category/:categoryId
// @access    Private
exports.addCategory = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  //   req.body.user = req.user.id;
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category,
  });
});

// @desc      Update category
// @route     PUT /api/v1/category/:categoryId
// @access    Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body, {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc      Delete Category
// @route     DELETE /api/category/:categoryId
// @access    Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.categoryId);
    if (!category) {
      return next(
        new ErrorResponse(`No Category with id ${req.params.categoryId}`, 400)
      );
    }
    await Category.findByIdAndRemove(req.params.categoryId);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc      Get products
// @route     GET /api/category/:categoryId/products
// @access    public
exports.getCategoryProduct = asyncHandler(async (req, res, next) => {
  if (req.params.categoryId) {
    const products = await Products.find({
      category: req.params.categoryId
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});