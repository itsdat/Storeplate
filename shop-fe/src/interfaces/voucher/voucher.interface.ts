import { IBase } from "../common/base.interface";

export interface IVoucher extends IBase {
    code: string;
    discountPercentage: number;
    limit: number;
    usedCount: number;
    minOrderTotal: number;
    maxDiscount: number;
    isActive: boolean
}