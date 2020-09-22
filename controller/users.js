const asyncHandler = require("../middleware/async");
const User = require("../models/User");


// @desc      Get single user
// @route     GET /api/auth/users/:userId
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    res.status(200).json({
        success: true,
        data: user,
    });
});

// @desc      Get  user
// @route     GET /api/auth/users/vendors
// @access    Private/Admin
exports.getVendor = asyncHandler(async (req, res, next) => {
    const user = await User.find({
        role: "vendor"
    });

    res.status(200).json({
        success: true,
        data: user,
    });
});
// @desc      Get  user
// @route     GET /api/auth/users/user
// @access    Private/Admin
exports.getAllUser = asyncHandler(async (req, res, next) => {
    const user = await User.find({
        role: "user"
    });

    res.status(200).json({
        success: true,
        data: user,
    });
});
// @desc      Create user
// @route     POST /api/auth/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        data: user,
    });
});

// @desc      Update user
// @route     PUT /api/auth/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: user,
    });
});

// @desc      Delete user
// @route     DELETE /api/auth/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({
        success: true,
        data: {},
    });
});