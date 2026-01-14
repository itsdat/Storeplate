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