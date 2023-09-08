/* eslint-disable node/no-missing-require */
const express = require("express");

const {
  getCategories,
  getCategoryByID,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
} = require("../utils/validators/categoryValidator");

const subCategoryRoute = require("./subCategoryRoute");

const router = express.Router();


router.use('/:categoryId/subcategories', subCategoryRoute);


router
.route("/")
  .post(createCategoryValidator, createCategory)
  .get(getCategories);

router.route("/get").get(getCategoryByName);



router
  .route("/:id")
  .get(getCategoryValidator, getCategoryByID)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
