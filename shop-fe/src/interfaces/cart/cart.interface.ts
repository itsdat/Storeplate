import { IProductOption } from "../product/product.interface";

export interface ICart{
    variantId?: string, // use for localStorage
    id?: string,
    createdAt?: string,
    updatedAt?: string
    name: string,
    thumbnail: string,
    quantity: number,
    price: number;
    discount?: number;
    size: IProductOption,
    slug: string,
    sizes: IProductOption[],
    productId: string,
    userId?: string
}