import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity" 
import { AppError } from "../../errors/appError"
import { Telefone } from "../../entities/telefone.entity" 
import Contato from "../../entities/contato.entity"
import { ItelefoneRequest } from "../../interfaces/telefoneInterface"


const createTelefoneService = async ({ phoneNumber, tipoID, tipo }: ItelefoneRequest): Promise<Telefone> => {
  const telefoneRepo = AppDataSource.getRepository(Telefone);
  const userRepo = AppDataSource.getRepository(User);
  const contatoRepo = AppDataSource.getRepository(Contato);

  const telefoneAlreadyExists = await telefoneRepo.findOneBy({ phoneNumber: phoneNumber });

  if (telefoneAlreadyExists) {
    throw new AppError("Telefone already exists", 400);
  }

  let entity;
  if (tipo === 'user') {
    entity = await userRepo.findOneBy({ id: tipoID });
  } else if (tipo === 'contato') {
    entity = await contatoRepo.findOneBy({ id: tipoID });
  } else {
    throw new AppError("Invalid entity type", 400);
  }

  if (!entity) {
    throw new AppError("Entity not found", 400);
  }

  const telefoneCreate = telefoneRepo.create({ phoneNumber: phoneNumber, [tipo]: entity });

  await telefoneRepo.save(telefoneCreate);

  return telefoneCreate;
}

export default createTelefoneService;