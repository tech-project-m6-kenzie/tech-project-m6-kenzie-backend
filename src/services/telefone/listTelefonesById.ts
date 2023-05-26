import AppDataSource from "../../data-source"
 
import { Telefone } from "../../entities/telefone.entity"
import { AppError } from "../../errors/appError";


const listTelefoneByIdService = async (id: string): Promise<Telefone> => {
  const telefoneRepo = AppDataSource.getRepository(Telefone);

  const telefone = await telefoneRepo.findOneBy({
    id,
  });

  if (!telefone) {
    throw new AppError('Telefone not Found', 404);
  }

  return telefone;
};

export default listTelefoneByIdService;