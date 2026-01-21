import { ICollection } from "../collection/collection.interface";
import { IBase } from "../common/base.interface";

export interface IProductTag extends IBase {
    label: string; // Bedroom
    value: string; // bedroom
}

export interface IProductOption {
    label: string; // "M", "XL", "XXL"
    value: string; // "m", "xl", "xxl"
}

export interface IProductImage extends IBase {
    image: string
}

export interface IProductVariant {
    id: string,
    images: string[];
    stock: number;
    price: number;
    discount?: number;
    size?: IProductOption
}
export interface IProduct extends IBase{
    name: string,
    slug: string,
    variants: IProductVariant[],
    tags?: IProductTag[];
    deliveryInfo?: string;
    rating?: number;
    reviewCount?: number;
    description: string,
    moreInfo?: string,
    isActive?: boolean
    sizes: IProductOption[];
    collectionId?: string;
    collection?: ICollection
}

export interface IProductQuery {
  search?: string;
  collectionId?: string;
  tagId?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}
