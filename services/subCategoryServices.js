const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const subCategoryModel = require("../models/subCategoryModel");

// @desc   --->    Create New subCategory
// @route  --->    Post    /api/v1/subCategories
// @access --->    Private by Admin
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});
