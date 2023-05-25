 
import AppDataSource from "../../data-source"
 
import { AppError } from "../../errors/appError"
 
import { Telefone } from "../../entities/telefone.entity"



export const deleteTelefoneService = async (id: string, userIdRequest: string): Promise<void> => {
  const telefoneRepo = AppDataSource.getRepository(Telefone);

  const findTelefone = await telefoneRepo.findOneBy({
    id,
  });

  if (!findTelefone) {
    throw new AppError('Telefone not Found', 404);  }

  
    await telefoneRepo.remove(findTelefone); 


}