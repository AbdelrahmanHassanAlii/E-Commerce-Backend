const express = require("express");

const {
  createSubCategory,
  getsubCategoryByID,
  getSubCategories,
} = require("../services/subCategoryServices");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);

router.route("/:id").get(getSubCategoryValidator, getsubCategoryByID);
module.exports = router;
