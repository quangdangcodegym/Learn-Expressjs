let { check, body, validationResult } = require('express-validator');
let validate = {
    validateCreateProduct: () => {
        return [
            body('name').isLength({ min: 5 }),
            body('author').isLength({ min: 5 }),
        ];
    }
};
module.exports = validate;
//# sourceMappingURL=validateProduct.js.map