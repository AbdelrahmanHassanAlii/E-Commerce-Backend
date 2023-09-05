const express = require("express");

const {
  createSubCategory,
  getsubCategoryByID,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryServices");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getsubCategoryByID)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;
