import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUser, IUserRequest } from "../../interfaces/userInterfaces"
import bcrypt from "bcrypt"
import { AppError } from "../../errors/appError"
import { Telefone } from "../../entities/telefone.entity"
import { IContato, IContatoRequest } from "../../interfaces/contatoInterface"
import Contato from "../../entities/contato.entity"


const createContatoService = async ({ name, email, telefone, userId }: IContatoRequest): Promise<IContato> => {
  const contatoRepo = AppDataSource.getRepository(Contato);
  const telefoneRepo = AppDataSource.getRepository(Telefone);
  const userRepo = AppDataSource.getRepository(User);

  const emailAlreadyExists = await contatoRepo.findOneBy({ email });
  const user = await userRepo.findOneBy({ id: userId });

  if (emailAlreadyExists) {
    throw new AppError("Email already exists", 400);
  }

  if (!user) {
    throw new AppError("User not found", 400);
  }

  const telefoneCreate = telefoneRepo.create({ phoneNumber: telefone });

  telefoneRepo.save(telefoneCreate)

  const contato = contatoRepo.create({
    name,
    email,
    telefones: [telefoneCreate],
    user,
  });

  await contatoRepo.save(contato);

  return contato;
}

export default createContatoService;