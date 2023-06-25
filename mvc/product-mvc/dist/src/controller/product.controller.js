"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../entity/Product");
const Category_1 = require("../entity/Category");
var productService = require('../service/productService');
var categoryService = require('../service/categoryService');
var { validationResult } = require('express-validator');
exports.showCreateProduct = async (req, res, next) => {
    let categoryList = await categoryService.findAllCategory();
    res.render('create', { categoryList: categoryList });
};
exports.createProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        let categoryList = await categoryService.findAllCategory();
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const category = new Category_1.Category();
        category.id = req.body.categoryId;
        let product = new Product_1.Product();
        product.price = req.body.price;
        product.name = req.body.name;
        product.image = req.file.originalname;
        product.author = req.body.author;
        product.category = category;
        console.log(product);
        productService.createProduct(product);
        res.redirect("/products");
    }
    catch (e) {
        console.log(e.message);
    }
};
exports.showProducts = async function (req, res, next) {
    let products = await productService.findAllProducts();
    console.log(products);
    let categoryList = await categoryService.findAllCategory();
    res.render('list', { products: products, categoryList: categoryList });
};
exports.showEditProduct = async (req, res) => {
    const idProduct = Number(req.params.id);
    let product = await productService.findProductById(idProduct);
    let categoryList = await categoryService.findAllCategory();
    res.render('update', { product: product, categoryList: categoryList });
};
exports.editProduct = async (req, res) => {
    const idProduct = Number(req.params.id);
    let product = await productService.findProductById(idProduct);
    let category = await categoryService.findCategoryById(req.body.categoryId);
    product.price = req.body.price;
    product.name = req.body.name;
    product.image = req.file.originalname;
    product.author = req.body.author;
    product.category = category;
    await productService.updateProduct(product);
    res.redirect('/products');
};
exports.deleteProduct = async (req, res) => {
    console.log("Product Id update: " + req.body.productId);
    const idProduct = Number(req.body.productId);
    let product = await productService.findProductById(idProduct);
    await productService.removeProduct(product);
    res.redirect('/products');
};
//# sourceMappingURL=product.controller.js.map