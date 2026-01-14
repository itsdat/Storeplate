import { HttpStatusCode } from "@/shared/enums/http-status.enum"

export interface IBaseCreatedRes<T = any> {
  data: T,
  message: string,
  statusCode: number
}

export interface IBaseUpdatedRes {
  message: string,
  statusCode: number
}

export interface IBaseGetAllRes<T = any> {
  data: T,
  totalItems: number,
  statusCode: number
}

export interface IBaseGetOneRes<T = any> {
  data: T,
  statusCode: number
}

export interface IBaseDeleteRes {
  message: string,
  statusCode: number
}

export interface IBaseErrorRes {
  data: any
  path: string;
  message: string;
  method: string;
  statusCode: HttpStatusCode;
  timestamp: string;
  stack?: IStackTrace;
  totalItems?: number
}

interface IStackTrace {
  stack: any;
  method: string;
  headers: any;
  query: any;
  body: any;
}
