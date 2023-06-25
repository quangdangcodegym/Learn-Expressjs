import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { Category } from './Category';
@Entity()

export class Product {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column()
    public price: number;

    @Column({ type: "varchar" })
    public name: string;

    @Column({ type: "varchar" })
    public author: string;

    @Column({ type: "varchar" })
    public image: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category
}