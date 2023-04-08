export enum apiEnum {
  base = 'https://backend-pma.up.railway.app',
 //base = 'http://localhost:3000',
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
  token: string,
  exp?: string

}

export interface IBoardCreate {
    title: string | null | undefined,
    owner?: string,
    users?: [
      string
    ]
}

export interface IBoardResponse{
  _id: string | undefined,
  title: string,
  owner?: string,
  users?: [
    string
  ]
}
export interface IColumnCreate {
  title: string | null | undefined,
  order: number | null | undefined
}

export interface IColumnResponse {
    _id: string | undefined,
    title: string,
    order: number,
    boardId: string,
}
