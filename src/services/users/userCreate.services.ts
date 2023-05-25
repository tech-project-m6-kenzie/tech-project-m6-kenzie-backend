import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUser, IUserRequest } from "../../interfaces/userInterfaces"
import bcrypt from "bcrypt"
import { AppError } from "../../errors/appError"
import { Telefone } from "../../entities/telefone.entity"


const userCreateService = async ({ name, email, password, isAdm, telefone }: IUserRequest): Promise<IUser> => {

  const userRepo = AppDataSource.getRepository(User)
  const telefoneRepo = AppDataSource.getRepository(Telefone)

  const emailAlreadyExists = await userRepo.findOneBy({ email: email })

  if (emailAlreadyExists) {
    throw new AppError("User already exists", 400)
  }

  const users = await userRepo.find()

  const user = userRepo.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10),
    isAdm: isAdm,
    isActive: true,
  })

  await userRepo.save(user)

  const telefoneCreate = telefoneRepo.create({
    phoneNumber: telefone,
    user: user
  })

  telefoneRepo.save(telefoneCreate)

  return user

}

export default userCreateService