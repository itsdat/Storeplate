export interface ILogin {
    email: string,
    password: string
}

export interface IRegister extends ILogin {
    firstName: string,
    lastName: string,
}