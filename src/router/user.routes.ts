import { Router } from "express";
import { deleteUserController, listAllUsersController, listAllUsersControllerActive, listUserController,   updateUserController, userCreateController } from "../controllers/users/user.controller";

import adminValidationMiddleWare from "../middlewares/adminValidation.middleware";
import isActiveValidationMiddleWare from "../middlewares/isActiveValidation.middleware";
import tokenAuthValidationMiddleware from "../middlewares/tokenAuthValidation.middleware";


const userRoutes = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API de gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreatePayload'
 *           example:
 *             name: "teset6"
 *             email: "teset6@gmail.com"
 *             password: "123456"
 *             isAdm: true
 *             telefone: "62991687171"
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na requisição
 */

userRoutes.post("/", userCreateController);

/**
 * @swagger
 * /users/user:
 *   get:
 *     summary: Obtém informações do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário obtidas com sucesso
 *       401:
 *         description: Autenticação necessária
 */

userRoutes.get("/user", tokenAuthValidationMiddleware, listUserController);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtém a lista de todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso
 *       401:
 *         description: Autenticação necessária
 *       403:
 *         description: Acesso restrito aos administradores
 */

userRoutes.get("/", tokenAuthValidationMiddleware, adminValidationMiddleWare, listAllUsersController);

/**
 * @swagger
 * /users/active:
 *   get:
 *     summary: Obtém a lista de usuários ativos
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários ativos obtida com sucesso
 *       401:
 *         description: Autenticação necessária
 *       403:
 *         description: Acesso restrito aos administradores
 */

userRoutes.get("/active", tokenAuthValidationMiddleware, adminValidationMiddleWare, listAllUsersControllerActive);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdatePayload'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       401:
 *         description: Autenticação necessária
 *       403:
 *         description: Acesso restrito aos administradores
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: Erro na requisição
 */

userRoutes.patch("/:id", tokenAuthValidationMiddleware, updateUserController);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdatePayload'
 *           example:
 *             name: "Joao"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       401:
 *         description: Autenticação necessária
 *       403:
 *         description: Acesso restrito aos administradores
 *       404:
 *         description: Usuário não encontrado
 */
 
userRoutes.delete("/:id", tokenAuthValidationMiddleware, adminValidationMiddleWare, isActiveValidationMiddleWare, deleteUserController);

export default userRoutes