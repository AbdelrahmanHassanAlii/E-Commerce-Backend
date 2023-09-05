const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const Category = require("../models/categoryModel");

// @desc   --->    Get All Categories
// @route  --->    Get    /api/v1/categories || /api/v1/categories?page=3&limit=2
// @access --->    Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;
  const categries = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categries.length, page, data: categries });
});

// @desc   --->    Get one Category by id
// @route  --->    Get    /api/v1/categories/:id
// @access --->    Public
exports.getCategoryByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    // res.status(404).json({ msg: `No category for this id ${id}` });
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc   --->    Get one Category by name
// @route  --->    Get    /api/v1/categories/get?name=:Children
// @access --->    Public
exports.getCategoryByName = asyncHandler(async (req, res, next) => {
  const { name } = req.query;
  const category = await Category.findOne({ name: name });
  if (!category) {
    // res.status(404).json({ msg: `No category for this name ${name}` });
    return next(new ApiError(`No category for this name ${name}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc   --->    Create New Category
// @route  --->    Post    /api/v1/categories
// @access --->    Private by Admin
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc   --->    Update Category
// @route  --->    Put    /api/v1/categories/:id
// @access --->    Private by Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    // res.status(404).json({ msg: `No category for this id ${id}` });
    return next(new ApiError(`No Category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc   --->    Delete Category
// @route  --->    Delete    /api/v1/categories/:id
// @access --->    Private by Admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete({ _id: id });
  if (!category) {
    // res.status(404).json({ msg: `No category for this id ${id}` });
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(204).send({ message: "Category deleted successfully" });
});
