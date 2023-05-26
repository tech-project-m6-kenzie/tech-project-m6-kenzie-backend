 
import AppDataSource from "../../data-source"
 
import { AppError } from "../../errors/appError"
import Contato from "../../entities/contato.entity"
import { Telefone } from "../../entities/telefone.entity"



export const deleteContatoService = async (id: string, userIdRequest: string): Promise<void> => {
  const contatoRepo = AppDataSource.getRepository(Contato);
  const telefoneRepo = AppDataSource.getRepository(Telefone);

  const findContato = await contatoRepo.findOneBy({
    id,
  });

  if (!findContato) {
    throw new AppError('Contato not Found', 404);
  }

  const telefones = await telefoneRepo.find({ where: { contato: { id: findContato.id } } });


  if (telefones.length > 0) {
    await telefoneRepo.remove(telefones);
  }

  await contatoRepo.delete(id);
}