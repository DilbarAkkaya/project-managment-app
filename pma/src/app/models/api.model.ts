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

export interface ISignData {
  name: string,
  login: string,
  password: string,
}
