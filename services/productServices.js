const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const productModel = require("../models/productModel");

// @desc   --->    Get All Products
// @route  --->    Get    /api/v1/products || /api/v1/products?page=3&limit=2
// @access --->    Public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  const products = await productModel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });
  res.status(200).json({ results: products.length, page, data: products });
});

// @desc   --->    Get one Product by id
// @route  --->    Get    /api/v1/products/:id
// @access --->    Public
exports.getProductByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel
    .findById(id)
    .populate({ path: "category", select: "name" });
  if (!product) {
    return next(new ApiError(`No Product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc   --->    Get one Product by name
// @route  --->    Get    /api/v1/products/get?name=:Children
// @access --->    Public
exports.getProductByName = asyncHandler(async (req, res, next) => {
  const { name } = req.query;
  const product = await productModel
    .findOne({ name: name })
    .populate({ path: "category", select: "name" });
  if (!product) {
    return next(new ApiError(`No Product for this name ${name}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc   --->    Create New Product
// @route  --->    Post    /api/v1/products
// @access --->    Private by Admin
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

// @desc   --->    Update Product
// @route  --->    Put    /api/v1/products/:id
// @access --->    Private by Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  } 
  const product = await productModel
    .findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    })
    .populate({ path: "category", select: "name" });
  if (!product) {
    return next(new ApiError(`No Product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc   --->    Delete Product
// @route  --->    Delete    /api/v1/products/:id
// @access --->    Private by Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete({ _id: id });
  if (!product) {
    return next(new ApiError(`No Product for this id ${id}`, 404));
  }
  res.status(204).send({ message: "Product deleted successfully" });
});
