import AppDataSource from "../../data-source"
import Contato from "../../entities/contato.entity"
import { Telefone } from "../../entities/telefone.entity"
 
 
const listContatosService = async (userId:string): Promise<Contato[]> => {
    const contatoRepo = AppDataSource.getRepository(Contato); 
    const contatos = await contatoRepo.find({ where: { user:{id: userId

    } }, relations: ['telefones'] });
  
    return contatos;
  };
  
  export default listContatosService;