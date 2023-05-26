import AppDataSource from "../../data-source";
import { Telefone } from "../../entities/telefone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
 

const listUserService = async (id: string): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const telefoneRepo = AppDataSource.getRepository(Telefone)
  
  
    const userFind = await userRepository.findOne({where:{id:id}})
 
    if(!userFind){
        throw new AppError('User not Found', 404)
    }

    return userFind;
  }
  
  export default listUserService;