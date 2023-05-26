 import AppDataSource from "../../data-source"
import { AppError } from "../../errors/appError" 
 
import { Telefone } from "../../entities/telefone.entity"
import { ItelefoneRequest } from "../../interfaces/telefoneInterface"


const updateTelefoneService = async (body: ItelefoneRequest , id: string): Promise<Telefone | Array<string | number>> =>{

    const telefoneRepo = AppDataSource.getRepository(Telefone)   

    const findTelefone = await telefoneRepo.findOneBy({
        id:id
      });

    if(!findTelefone){
        throw new AppError('Telefone not Found', 404)
    }   
    
    if(body.id?.toString()){        
        throw new AppError('Field cant be altered', 401) 
    }

           
    await telefoneRepo.update(
        id,
        {        
            phoneNumber: body.phoneNumber ? body.phoneNumber : findTelefone.phoneNumber,             
            id: findTelefone.id
        }
    )

    const atualizadoTelefone = await telefoneRepo.findOneBy({
        id
    })

    return atualizadoTelefone!;   

}
 export default updateTelefoneService