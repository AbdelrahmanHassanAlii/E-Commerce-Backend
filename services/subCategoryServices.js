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

// @desc   --->    Get All sucCategories
// @route  --->    Get    /api/v1/subcategories || /api/v1/subcategories?page=3&limit=2
// @access --->    Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;
  const subCategories = await subCategoryModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc   --->    Get one subCategory by id
// @route  --->    Get    /api/v1/subcategories/:id
// @access --->    Public
exports.getsubCategoryByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findById(id);
  if (!subCategory) {
    // res.status(404).json({ msg: `No category for this id ${id}` });
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});


