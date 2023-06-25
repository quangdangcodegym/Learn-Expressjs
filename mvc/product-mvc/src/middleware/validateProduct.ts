let {check,body, validationResult} = require('express-validator');
  let validate = {
    validateCreateProduct: () => {
        return [ 
          body('name').isLength({ min: 5 }),
          body('author').isLength({ min: 5 }),
          // check('name', 'Name does not empty').not().isEmpty(),
          // check('name', 'Username more than 6 degits').isLength({ min: 6 }),
          // check('author', 'Author does not Empty').not().isEmpty(),
          // check('categoryId', 'Id Category not right').isAlphanumeric(),
        ]; 
      }
  };

  module.exports = validate;

