import { IBase } from "../common/base.interface";
import { IProductOption } from "../product/product.interface";

export interface ICart extends IBase{
    name: string,
    thumbnail: string,
    quantity: number,
    price: number;
    discount?: number;
    size: IProductOption, 
}