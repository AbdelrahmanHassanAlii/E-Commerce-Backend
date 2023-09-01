const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// exports.getSubCategoryValidator = [
//   check("id")
//   .isMongoId()
//   .withMessage("Invalid Subcategory id format"),
//   validatorMiddleware,
// ];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage(`Subcategory required`)
    .isLength({ min: 2 })
    .withMessage(`name is too short`)
    .isLength({ max: 30 })
    .withMessage(`name is too long`),
  check("category")
    .notEmpty()
    .withMessage(`Subcategory must be belong to category`)
    .isMongoId()
    .withMessage("invalid category id format"),
  validatorMiddleware,
];

// exports.updateSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid Subcategory id format"),
//   validatorMiddleware,
// ];

// exports.deleteSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid Subcategory id format"),
//   validatorMiddleware,
// ];
