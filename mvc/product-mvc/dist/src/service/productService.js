"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Product_1 = require("./../entity/Product");
exports.findAllProducts = () => {
    return data_source_1.AppDataSource.getRepository(Product_1.Product).find({
        relations: {
            category: true,
        },
    });
};
exports.createProduct = (product) => {
    data_source_1.AppDataSource.getRepository(Product_1.Product).save(product);
};
exports.findProductById = (idProduct) => {
    return data_source_1.AppDataSource.getRepository(Product_1.Product).findOne({
        where: {
            id: idProduct,
        },
        relations: {
            category: true,
        },
    });
};
exports.updateProduct = (product) => {
    data_source_1.AppDataSource.getRepository(Product_1.Product).save(product);
};
exports.removeProduct = (product) => {
    data_source_1.AppDataSource.getRepository(Product_1.Product).remove(product);
};
//# sourceMappingURL=productService.js.map