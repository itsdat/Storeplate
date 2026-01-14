import { IBase } from "../common/base.interface";

export interface IUpload extends IBase {
    key: string,
    url: string,
    folder: string
}