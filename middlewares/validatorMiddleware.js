const { param, body, validationResult } = require('express-validator');

const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Continue to the getCategoryByID handler if validation passes
  };
  module.exports = validatorMiddleware;