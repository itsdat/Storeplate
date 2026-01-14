import { IBase } from "../common/base.interface";

export interface ICollection extends IBase {
    image: string,
    name: string,
    isActive?: boolean
}