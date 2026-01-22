import { IBase } from "../common/base.interface";

export interface IAddress extends IBase{
    city: string,
    district: string,
    wards: string,
    street: string,
    isDefault: boolean
    userId: string
}