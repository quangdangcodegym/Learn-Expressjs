import { Schema, model, Document, Types  } from "mongoose";
import { Author } from "./author.model";



interface IBook extends Document{

    title: string;
    description: string;
    /**
     Nếu để author: string thì sẽ báo lỗi như vậy
     error TS2322: Type '{ type: typeof Schema.Types.ObjectId; ref: string; }' 
     is not assignable to type 'SchemaDefinitionProperty<string>'
     */
    author: string | Types.ObjectId;
    keywords: object[];

}



const keywordsSchema = new Schema({

    keyword: String

})



const bookSchema = new Schema<IBook>({
    title: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: Author.modelName },
    keywords: [keywordsSchema],
})



const Book = model<IBook>('Book', bookSchema);
export { Book };