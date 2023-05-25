import createTelefoneService from "../../services/telefone/createTelefone.services";
import { Request, Response } from 'express'
import listTelefonesService from "../../services/telefone/listTelefones.service";
import listTelefoneByIdService from "../../services/telefone/listTelefonesById";
import { Telefone } from "../../entities/telefone.entity";
import updateTelefoneService from "../../services/telefone/updateTelefone.service";
import { deleteTelefoneService } from "../../services/telefone/deleteTelefone.service";


export const listTelefonesController = async (req: Request, res: Response) => {
    const userId = req.user.id
    const contatos = await listTelefonesService(userId)
    return res.json(contatos)
}

export const listTelefonesByIdController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const contatos = await listTelefoneByIdService(id)
    return res.json(contatos)
}


export const updateTelefoneController = async (req: Request, res: Response) => {
    const body = req.body
    const id: string = req.params.id

    const updateTelefone = await updateTelefoneService(body, id);

    if (updateTelefone instanceof Telefone) {
        const resposta = {
            createdAt: updateTelefone.createdAt,
            updatedAt: updateTelefone.updatedAt,
            id: updateTelefone.id,
        }

        return res.json(resposta);
    }


}

export const deleteTelefoneController = async (req: Request, res: Response) => {

    const { id } = req.params
    const userIdRequest = req.user.id


    try {
        await deleteTelefoneService(id, userIdRequest);
        return res.status(204).json({ message: 'Contato deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while deleting the contato' });
    }


}




