 import AppDataSource from "../../data-source"
import { AppError } from "../../errors/appError" 
import {  IContatoUpdate } from "../../interfaces/contatoInterface"
import Contato from "../../entities/contato.entity"
 


const updateContatoService = async (body: IContatoUpdate , id: string): Promise<Contato | Array<string | number>> =>{

    const contatoRepo = AppDataSource.getRepository(Contato)   

    const findContato = await contatoRepo.findOneBy({
        id:id
      });

    if(!findContato){
        throw new AppError('Contato not Found', 404)
    }   
    
    if(body.id?.toString()){        
        throw new AppError('Field cant be altered', 401) 
    }

           
    await contatoRepo.update(
        id,
        {
            name: body.name ? body.name : findContato.name,
            email: body.email ? body.email : findContato.email,                
            id: findContato.id
        }
    )

    const contato = await contatoRepo.findOneBy({
        id
    })

    return contato!;   

}
 export default updateContatoService