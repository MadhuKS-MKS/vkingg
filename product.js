const path = require("path");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Products = require("../models/Product");

// @desc      Get products
// @route     GET /api/products
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single product
// @route     GET api/products/:productId
// @access    Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Products.findById(req.params.ProductId).populate({
    path: "category",
    select: "catname",
  });

  if (!product) {
    return next(
      new ErrorResponse(`No product with the id of ${req.params.productId}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc      Add product
// @route     POST api/products
// @access    Private
exports.addProduct = asyncHandler(async (req, res, next) => {
  const product = await Products.create(req.body);
  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc      Update product
// @route     PUT /api/products/:productId
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Products.findById(req.params.ProductId);

  if (!product) {
    return next(
      new ErrorResponse(`No Product with the id of ${req.params.ProductId}`),
      404
    );
  }

  product = await Products.findByIdAndUpdate(req.params.ProductId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc      Delete product
// @route     DELETE /api/category/products/:productId
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Products.findById(req.params.ProductId);

  if (!product) {
    return next(
      new ErrorResponse(`No Product with the id of ${req.params.ProductId}`),
      404
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Upload photo for product
// @route     POST /api/products/photo
// @access    Private
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.mv(`${__dirname}/../uploads/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    const files = `/VegieeKing/uploads/${file.name}`;

    res.status(200).json({
      // success: true,
      data: files,
    });
  });
});
