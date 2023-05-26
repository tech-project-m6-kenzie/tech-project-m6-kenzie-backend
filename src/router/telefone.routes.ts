import { Router } from "express";
 
import tokenAuthValidationMiddleware from "../middlewares/tokenAuthValidation.middleware";
import { deleteTelefoneController, listTelefonesByIdController, listTelefonesController, updateTelefoneController } from "../controllers/telefones/telefone.controller";

const telefoneRoutes = Router()

 
/**
 * @swagger
 * tags:
 *   name: Telefones
 *   description: API de gerenciamento de telefones
 */

/**
 * @swagger
 * /telefones:
 *   get:
 *     summary: Obtém a lista de todos os telefones do usúario logado
 *     tags: [Telefones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de telefones obtida com sucesso
 *       401:
 *         description: Autenticação necessária
 */

telefoneRoutes.get("", tokenAuthValidationMiddleware, listTelefonesController);

/**
 * @swagger
 * /telefones/{id}:
 *   get:
 *     summary: Obtém informações de um telefone pelo ID
 *     tags: [Telefones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do telefone a ser obtido
 *     responses:
 *       200:
 *         description: Informações do telefone obtidas com sucesso
 *       401:
 *         description: Autenticação necessária
 *       404:
 *         description: Telefone não encontrado
 */

telefoneRoutes.get("/:id", tokenAuthValidationMiddleware, listTelefonesByIdController);

/**
 * @swagger
 * /telefones/{id}:
 *   patch:
 *     summary: Atualiza um telefone pelo ID
 *     tags: [Telefones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do telefone a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TelefoneUpdatePayload'
 *           example:
 *             phoneNumber: "62991687171"
 *             tipo: "user"
 *             id: "0235ea351a351a35e1a35e1a351e3a5"
 *     responses:
 *       200:
 *         description: Telefone atualizado com sucesso
 *       401:
 *         description: Autenticação necessária
 *       404:
 *         description: Telefone não encontrado
 *       400:
 *         description: Erro na requisição
 */


telefoneRoutes.patch("/:id", tokenAuthValidationMiddleware, updateTelefoneController);

/**
 * @swagger
 * /telefones/{id}:
 *   delete:
 *     summary: Exclui um telefone pelo ID
 *     tags: [Telefones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do telefone a ser excluído
 *     responses:
 *       200:
 *         description: Telefone excluído com sucesso
 *       401:
 *         description: Autenticação necessária
 *       404:
 *         description: Telefone não encontrado
 */

telefoneRoutes.delete("/:id", tokenAuthValidationMiddleware, deleteTelefoneController);



export default telefoneRoutes