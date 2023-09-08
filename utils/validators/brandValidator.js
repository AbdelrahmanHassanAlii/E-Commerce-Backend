const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleware,
];

exports.createBrandValidator = [
    check('name').notEmpty().withMessage(`Brand required`).
    isLength({min: 3}).withMessage(`name is too short`).
    isLength({max: 30}).withMessage(`name is too long`)
    ,validatorMiddleware,
];

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleware,
];

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleware,
];