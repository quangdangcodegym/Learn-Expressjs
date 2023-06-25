var express = require('express');
var router = express.Router();
// let {check, validationResult} = require('express-validator');
var upload = require('../middleware/multer');
const productController = require('../controller/product.controller');

let validateProduct = require('../middleware/validateProduct');
router.get('/create', productController.showCreateProduct);
router.post('/create',
validateProduct.validateCreateProduct() , upload.single('image'), productController.createProduct);

router.get('/', productController.showProducts);

router.get('/update/:id',upload.single('image') , productController.showEditProduct);
router.post('/update/:id', upload.single('image') , productController.editProduct);

router.post('/delete', productController.deleteProduct);





module.exports = router;