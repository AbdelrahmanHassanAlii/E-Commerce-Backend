/* eslint-disable node/no-missing-require */
const express = require("express");

const {
  createProduct,
  getProducts,
  getProductByName,
  getProductByID,
  updateProduct,
  deleteProduct,
} = require("../services/productServices");

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const router = express.Router();

router
.route("/")
  .post(createProductValidator, createProduct)
  .get(getProducts);

router.route("/get").get(getProductByName);



router
  .route("/:id")
  .get(getProductValidator, getProductByID)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
