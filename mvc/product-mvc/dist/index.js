"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const Product_1 = require("./src/entity/Product");
const data_source_1 = require("./src/data-source");
const express_1 = __importDefault(require("express"));
const Category_1 = require("./src/entity/Category");
const { check, validationResult } = require('express-validator');
const cors_1 = __importDefault(require("cors"));
const PORT = 3000;
data_source_1.AppDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express_1.default.static('./src/public'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/upload');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.listen(PORT, () => {
    console.log("App running with port: " + PORT);
});
app.get('/products', async (req, res) => {
    let products = await data_source_1.AppDataSource.getRepository(Product_1.Product).find({
        relations: {
            category: true,
        },
    });
    console.log(products);
    let categoryList = await data_source_1.AppDataSource.getRepository(Category_1.Category).find();
    console.log(categoryList);
    res.render('list', { products: products, categoryList: categoryList });
});
app.get('/products/create', async (req, res) => {
    let categoryList = await data_source_1.AppDataSource.getRepository(Category_1.Category).find();
    res.render('create', { categoryList: categoryList });
});
app.post("/products/create", upload.single('image'), async (req, res) => {
    try {
        const category = new Category_1.Category();
        category.id = req.body.categoryId;
        let product = new Product_1.Product();
        product.price = req.body.price;
        product.name = req.body.name;
        product.image = req.file.originalname;
        product.author = req.body.author;
        product.category = category;
        console.log(product);
        const productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
        await productRepository.save(product);
        res.redirect("/products");
    }
    catch (e) {
        console.log(e.message);
    }
});
app.get("/products/:id/update", async (req, res) => {
    const idProduct = Number(req.params.id);
    let product = await data_source_1.AppDataSource.getRepository(Product_1.Product).findOne({
        where: {
            id: idProduct,
        },
        relations: {
            category: true,
        },
    });
    let categoryList = await data_source_1.AppDataSource.getRepository(Category_1.Category).find();
    res.render('update', { product: product, categoryList: categoryList });
});
app.post("/products/:id/update", upload.single('image'), async (req, res) => {
    const idProduct = Number(req.params.id);
    let product = await data_source_1.AppDataSource.getRepository(Product_1.Product).findOne({
        where: {
            id: idProduct,
        },
        relations: {
            category: true,
        },
    });
    let category = await data_source_1.AppDataSource.getRepository(Category_1.Category).findOne({
        where: {
            id: req.body.categoryId,
        }
    });
    product.price = req.body.price;
    product.name = req.body.name;
    product.image = req.file.originalname;
    product.author = req.body.author;
    product.category = category;
    await data_source_1.AppDataSource.getRepository(Product_1.Product).save(product);
    res.redirect('/products');
});
app.post("/products/delete", upload.single('image'), async (req, res) => {
    console.log("Product Id update: " + req.body.productId);
    const idProduct = Number(req.body.productId);
    let product = await data_source_1.AppDataSource.getRepository(Product_1.Product).findOne({
        where: {
            id: idProduct,
        },
        relations: {
            category: true,
        },
    });
    await data_source_1.AppDataSource.getRepository(Product_1.Product).remove(product);
    res.redirect('/products');
});
app.get('/api/products', async (req, res) => {
    let products = await data_source_1.AppDataSource.getRepository(Product_1.Product).find({
        relations: {
            category: true,
        },
    });
    let categoryList = await data_source_1.AppDataSource.getRepository(Category_1.Category).find();
    console.log(categoryList);
    res.json(products);
});
let validateData = () => {
    return [
        check('name', 'name more than 6 degits').isLength({ min: 6 })
    ];
};
app.post('/hello', [
    check('email', 'Email length should be 10 to 30 characters')
        .isLength({ min: 10, max: 30 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    else {
        res.status(200).json({ message: 'OK con dê' });
    }
});
//# sourceMappingURL=index.js.map