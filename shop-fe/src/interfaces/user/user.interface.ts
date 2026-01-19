import { IBase } from "../common/base.interface";

export interface IAddress {
    name: string,
    isDefault: boolean,
    value: string,
}

export interface IUser extends IBase{
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar: string,
    verified: boolean,
    role: string,
    phone: string,
    address: IAddress[]
}