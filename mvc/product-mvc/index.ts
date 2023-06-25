import multer from 'multer';
import bodyParser from 'body-parser';
import { Product } from "./src/entity/Product";
import { AppDataSource } from "./src/data-source";
import express, { Request, Response } from "express";
import { Category } from './src/entity/Category';
// import {check, validationResult} from 'express-validator';
const { check, validationResult }
    = require('express-validator');
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/upload')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

app.listen(PORT, () => {
    console.log("App running with port: " + PORT)
})
app.get('/products', async (req: Request, res: Response) => {
    let products = await AppDataSource.getRepository(Product).find(
        {
            relations: {
                category: true,
            },
        }
    );
    console.log(products);
    let categoryList = await AppDataSource.getRepository(Category).find();
    console.log(categoryList);
    
    res.render('list', { products: products, categoryList: categoryList });
})

app.get('/products/create', async (req: Request, res: Response) => {
    let categoryList = await AppDataSource.getRepository(Category).find();
    res.render('create', {categoryList: categoryList});
})
/**
 Tham số thứ 2 trong hàm app.post() là upload.single('image'). Đây là một middleware của multer framework, được sử dụng để xử lý việc upload file từ client lên server.

Cụ thể:

upload: là một instance của multer framework, đã được khởi tạo và cấu hình trước đó.
.single('image'): là một method của multer để chỉ định rằng server chỉ chấp nhận việc upload 
một file duy nhất với tên là image. Method này trả về một middleware function để được sử dụng bởi Express.
Khi có một request POST tới endpoint /products/create, middleware upload.single('image') 
sẽ được thực thi trước hàm callback của request. Nếu client gửi lên một file có tên là image, 
middleware này sẽ xử lý file đó và gắn kết file vào object req.file của request. Nếu không có 
file nào được gửi lên, req.file sẽ là undefined.

Sau đó, hàm callback của request sẽ được thực thi. Trong ví dụ này, 
hàm callback được định nghĩa là một async function, sử dụng req để lấy dữ liệu 
được gửi từ client và lưu vào cơ sở dữ liệu thông qua ORM TypeORM. 
Cuối cùng, server sẽ redirect tới trang /products nếu việc lưu dữ liệu thành công, 
hoặc log lỗi ra console nếu có lỗi xảy ra.
 */
app.post("/products/create", upload.single('image'), async (req: any, res: any) => {
    try {

        const category = new Category()
        category.id = req.body.categoryId;


        let product = new Product();
        product.price = req.body.price;
        product.name = req.body.name;
        product.image = req.file.originalname;
        product.author = req.body.author;
        product.category = category;

        console.log(product);
        

        const productRepository = AppDataSource.getRepository(Product)
        await productRepository.save(product);
        res.redirect("/products")
    } catch (e) {
        console.log(e.message);
    }
});


app.get("/products/:id/update", async (req, res) => {
    const idProduct: number = Number(req.params.id);

    let product = await AppDataSource.getRepository(Product).findOne({
        where: {
            id: idProduct,
        },
        relations: {
            category: true,
        },
    });
    let categoryList = await AppDataSource.getRepository(Category).find();
    res.render('update', {product: product, categoryList: categoryList});

})

app.post("/products/:id/update", upload.single('image'), async (req: any, res: any) => {
    const idProduct: number = Number(req.params.id);
    let product = await AppDataSource.getRepository(Product).findOne({
        where: {
            id: idProduct,
        },
        relations: {
            category: true,
        },
    });

    let category = await AppDataSource.getRepository(Category).findOne({
        where: {
            id: req.body.categoryId,
        }
    });
    product.price = req.body.price;
    product.name = req.body.name;
    product.image = req.file.originalname;
    product.author = req.body.author;
    product.category = category;

    
    await AppDataSource.getRepository(Product).save(product);

    res.redirect('/products');
});

app.post("/products/delete", upload.single('image'), async (req: any, res: any) => {
    console.log("Product Id update: " + req.body.productId);
    
    const idProduct: number = Number(req.body.productId);

    let product = await AppDataSource.getRepository(Product).findOne({
        where: {
            id: idProduct,
        },
        relations: {
            category: true,
        },
    });

    await AppDataSource.getRepository(Product).remove(product)
    res.redirect('/products');

})
//

app.get('/api/products', async (req: Request, res: Response) => {
    let products = await AppDataSource.getRepository(Product).find(
        {
            relations: {
                category: true,
            },
        }
    );
    let categoryList = await AppDataSource.getRepository(Category).find();
    console.log(categoryList);
    
    res.json(products);
})

let validateData = () => {
    return [ 
      check('name', 'name more than 6 degits').isLength({ min: 6 })
    ]; 
  }

app.post('/hello', [
    check('email', 'Email length should be 10 to 30 characters')
                    .isLength({ min: 10, max: 30 })
], (req: any, res: any)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }else{
        res.status(200).json({ message: 'OK con dê' });
    }
    
})


