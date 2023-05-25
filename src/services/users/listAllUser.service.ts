import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUser } from "../../interfaces/userInterfaces"

const listAllUserService = async (): Promise<IUser[]> =>{

    const userRepository = AppDataSource.getRepository(User)
 

    const users = await userRepository.find({ relations: ['telefones', 'contatos', 'contatos.telefones'] }); 

    
    return users

}

export default listAllUserService