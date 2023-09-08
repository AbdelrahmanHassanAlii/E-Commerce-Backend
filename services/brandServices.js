const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const brandModel = require("../models/brandModel");

// @desc   --->    Create New brand
// @route  --->    Post    /api/v1/brands
// @access --->    Private by Admin
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await brandModel.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({ data: brand });
});

// @desc   --->    Get All Brands
// @route  --->    Get    /api/v1/brands || /api/v1/brands?page=3&limit=2
// @access --->    Public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;
  
  const brands = await brandModel
    .find({})
    .skip(skip)
    .limit(limit);
    // .populate({ path: "category", select: "name" });
  res
    .status(200)
    .json({ results: brands.length, page, data: brands });
});

// @desc   --->    Get one brand by id
// @route  --->    Get    /api/v1/brands/:id
// @access --->    Public
exports.getBrandByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel
    .findById(id);
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc   --->    Update brand
// @route  --->    Put    /api/v1/brands/:id
// @access --->    Private by Admin
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
}); 

// @desc   --->    Delete brand
// @route  --->    Delete    /api/v1/brands/:id
// @access --->    Private by Admin
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete({ _id: id });
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(204).json({ message: "Brand deleted successfully" });
});
