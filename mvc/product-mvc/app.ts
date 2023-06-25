
import bodyParser from 'body-parser';
import { Product } from "./src/entity/Product";
import { AppDataSource } from "./src/data-source";
import express, { Request, Response } from "express";
import { Category } from './src/entity/Category';
// import {check, validationResult} from 'express-validator';
const { check, validationResult } = require('express-validator');
import cors from 'cors';
const PORT = 3000;

// thiết lập kết nối cơ sở dữ liệu
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static( './src/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

var indexRouter = require('./src/routes/index');
var productRouter = require('./src/routes/product.route');



app.listen(PORT, () => {
    console.log("App running with port app.ts: " + PORT)
})


app.use('/', indexRouter);
app.use('/products/', productRouter);