export enum apiEnum {
  base = 'https://backend-pma.up.railway.app',
  signup = 'auth/signup',
  login = 'auth/signin',
  board = 'boards',
}

export interface INewUser {
    name: string,
    login: string,
    _id: string,
}

export interface IAuthData {
  login: string,
  password: string,
}

export interface ISignData extends IAuthData{
  name: string,
}

export interface IAuthResponse {
  token: string
}
