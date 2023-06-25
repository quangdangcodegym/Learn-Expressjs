import {AppDataSource} from '../data-source';
import { Product } from './../entity/Product';

exports.findAllProducts = ()=>{
    return AppDataSource.getRepository(Product).find(
        {
            relations: {
                category: true,
            },
        }
    );
}
exports.createProduct = (product)=>{
    AppDataSource.getRepository(Product).save(product);
}

exports.findProductById = (idProduct) =>{
    return AppDataSource.getRepository(Product).findOne({
        where: {
            id: idProduct,
        },
        relations: {
            category: true,
        },
    });
}

exports.updateProduct = (product)=>{
    AppDataSource.getRepository(Product).save(product);
}
exports.removeProduct = (product)=>{
    AppDataSource.getRepository(Product).remove(product)
}


