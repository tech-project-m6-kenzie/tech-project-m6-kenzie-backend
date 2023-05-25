import { User } from "../entities/user.entity"
import { ItelefoneResponse } from "./telefoneInterface"

export interface IContatoRequest {
    name: string
    email: string   
    telefone:string
    userId: string
}
export interface IContato {
    id: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date    
    telefones: ItelefoneResponse[]
    user: User
  }

export interface IContatoUpdate {
    name?: string
    email?: string   
    id?: string 
    telefone?:string 
}