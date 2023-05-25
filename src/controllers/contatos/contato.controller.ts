import { Request, Response } from 'express'
import Contato from '../../entities/contato.entity'
import createContatoService from '../../services/contato/createContato.services'
import listContatosService from '../../services/contato/listContato.service'
import updateContatoService from '../../services/contato/updateContato.service'
import { deleteContatoService } from '../../services/contato/deleteContato.service'
import listContatoByIdService from '../../services/contato/listContatoById'



export const createContatoController = async (req: Request, res: Response) => {

    const { name, email, telefone } = req.body
    const userId = req.user.id
    const newContato = await createContatoService({ name, email, telefone, userId })


    return res.status(201).send(newContato)

}


export const listContatosController = async (req: Request, res: Response) => {
  const userId = req.user.id
    const contatos = await listContatosService(userId)
    return res.json(contatos)
}

export const listContatoByIdController = async (req: Request, res: Response) => {
  const id: string = req.params.id
    const contatos = await listContatoByIdService(id)
    return res.json(contatos)
}


export const updateContatoController = async (req: Request, res: Response) => {
    const body = req.body 
    const id: string = req.params.id

      const updateContato = await updateContatoService(body, id);

      if (updateContato instanceof Contato) {
          const resposta = {
              email: updateContato.email,
              name: updateContato.name,           
              createdAt: updateContato.createdAt,
              updatedAt: updateContato.updatedAt,
              id: updateContato.id
          }

          return res.json(resposta);
      }
 

}

export const deleteContatoController = async (req: Request, res: Response) => {

    const { id } = req.params  
    const userIdRequest = req.user.id


    try {
      await deleteContatoService(id, userIdRequest);
      return res.status(204).json({ message: 'Contato deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred while deleting the contato' });
    }

    
}




