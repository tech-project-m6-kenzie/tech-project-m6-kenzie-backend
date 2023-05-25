export interface ItelefoneRequest { 
    phoneNumber:string   
    id?:string
    tipo:string 
    tipoID?:string   
}

export interface ItelefoneResponse { 
    phoneNumber:string
    createdAt: Date
    updatedAt: Date
    id: string
}

