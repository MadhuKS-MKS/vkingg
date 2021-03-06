const express = require("express");
const {
    getAllUser,
    getUser,
    getVendor,
    createUser,
    updateUser,
    deleteUser,
} = require("../controller/users");

const User = require("../models/User");

const router = express.Router({
    mergeParams: true
});

const advancedResults = require("../middleware/advancedResults");
const {
    protect,
    authorize
} = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router.route("/").post(createUser);
router.route("/vendor").get(advancedResults(User), getVendor);
router.route("/user").get(advancedResults(User), getAllUser);

router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;