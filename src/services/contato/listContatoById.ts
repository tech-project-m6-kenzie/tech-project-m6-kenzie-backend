import AppDataSource from "../../data-source"
import Contato from "../../entities/contato.entity"
 
import { AppError } from "../../errors/appError";


const listContatoByIdService = async (id: string): Promise<Contato> => {
  const contatoRepo = AppDataSource.getRepository(Contato);

  const contato = await contatoRepo.findOneBy({
    id,
  });

  if (!contato) {
    throw new AppError('Contato not Found', 404);
  }

  return contato;
};

export default listContatoByIdService;