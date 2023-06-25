"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = require("./src/data-source");
const express_1 = __importDefault(require("express"));
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
var indexRouter = require('./src/routes/index');
var productRouter = require('./src/routes/product.route');
app.listen(PORT, () => {
    console.log("App running with port app.ts: " + PORT);
});
app.use('/', indexRouter);
app.use('/products/', productRouter);
//# sourceMappingURL=app.js.map