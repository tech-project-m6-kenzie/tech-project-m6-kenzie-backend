import { Router } from "express";
 
 
import tokenAuthValidationMiddleware from "../middlewares/tokenAuthValidation.middleware";
import { createContatoController, deleteContatoController,  listContatoByIdController,  listContatosController,  updateContatoController } from "../controllers/contatos/contato.controller";


const contatoRoutes = Router()

/**
 * @swagger
 * tags:
 *   name: Contatos
 *   description: API de gerenciamento de contatos
 */

/**
* @swagger
 * /contatos:
 *   post:
 *     summary: Cria um novo contato
 *     tags: [Contatos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContatoCreatePayload'
 *           example:
 *             name: "van"
 *             email: "van@gmail.com"
 *             phoneNumber: "62991687171"
 *     responses:
 *       200:
 *         description: Contato criado com sucesso
 *       401:
 *         description: Autenticação necessária
 *       500:
 *         description: Erro interno do servidor
 */
contatoRoutes.post("", tokenAuthValidationMiddleware, createContatoController);

/**
 * @swagger
 * /contatos:
 *   get:
 *     summary: Obtém a lista de todos os contatos do usúario logado
 *     tags: [Contatos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contatos obtida com sucesso
 *       401:
 *         description: Autenticação necessária
 */
contatoRoutes.get("", tokenAuthValidationMiddleware, listContatosController);

/**
 * @swagger
 * /contatos/{id}:
 *   get:
 *     summary: Obtém informações de um contato pelo ID
 *     tags: [Contatos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato a ser obtido
 *     responses:
 *       200:
 *         description: Informações do contato obtidas com sucesso
 *       401:
 *         description: Autenticação necessária
 *       404:
 *         description: Contato não encontrado
 */
contatoRoutes.get("/:id", tokenAuthValidationMiddleware, listContatoByIdController);

/**
 * @swagger
 * /contatos/{id}:
 *   patch:
 *     summary: Atualiza um contato pelo ID
 *     tags: [Contatos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/ContatoUpdatePayload'
 *           example:
 *             name: "Maria"
 *             phonenumber: "132454546"
 *     responses:
 *       200:
 *         description: Contato atualizado com sucesso
 *       401:
 *         description: Autenticação necessária
 *       404:
 *         description: Contato não encontrado
 */

contatoRoutes.patch("/:id", tokenAuthValidationMiddleware, updateContatoController);

/**
 * @swagger
 * /contatos/{id}:
 *   delete:
 *     summary: Exclui um contato pelo ID
 *     tags: [Contatos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato a ser excluído
 *     responses:
 *       200:
 *         description: Contato excluído com sucesso
 *       401:
 *         description: Autenticação necessária
 *       404:
 *         description: Contato não encontrado
 */
contatoRoutes.delete("/:id", tokenAuthValidationMiddleware, deleteContatoController);



export default contatoRoutes