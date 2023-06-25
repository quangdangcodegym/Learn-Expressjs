"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Category_1 = require("../entity/Category");
exports.findAllCategory = () => {
    return data_source_1.AppDataSource.getRepository(Category_1.Category).find();
};
exports.findCategoryById = (idCategory) => {
    return data_source_1.AppDataSource.getRepository(Category_1.Category).findOne({
        where: {
            id: idCategory,
        }
    });
};
//# sourceMappingURL=categoryService.js.map