var express = require('express');
var router = express.Router();

var productService = require('../service/productService');
var categoryService = require('../service/categoryService');
/* GET home page. */
router.get('/', async function (req, res, next) {

  let products = await productService.findAllProducts();
  console.log(products);
  let categoryList = await categoryService.findAllCategory();

  res.render('list', { products: products, categoryList: categoryList });
});


module.exports = router;
