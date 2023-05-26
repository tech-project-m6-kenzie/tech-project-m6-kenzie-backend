import AppDataSource from "../../data-source"
 
import { Telefone } from "../../entities/telefone.entity"
 
 
const listTelefonesService = async (userId:string): Promise<Telefone[]> => {
    const telefonesRepo = AppDataSource.getRepository(Telefone); 
    const telefones = await telefonesRepo.find({ where: { user:{id: userId  } } });
  
    return telefones;
  };
  
  export default listTelefonesService;