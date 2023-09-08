/* eslint-disable node/no-missing-require */
const express = require("express");

const {
  createBrand,
  getBrands,
  getBrandByID,
  updateBrand,
  deleteBrand,
} = require("../services/brandServices");

const {
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
} = require("../utils/validators/brandValidator");



const router = express.Router();


router
.route("/")
  .post(createBrandValidator, createBrand)
  .get(getBrands);

router
  .route("/:id")
  .get(getBrandValidator, getBrandByID)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
