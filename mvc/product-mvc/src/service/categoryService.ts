import {AppDataSource} from '../data-source';
import { Category } from '../entity/Category';

exports.findAllCategory = ()=>{
    return AppDataSource.getRepository(Category).find();
}

exports.findCategoryById = (idCategory)=>{
    return AppDataSource.getRepository(Category).findOne({
        where: {
            id: idCategory,
        }
    });
}
