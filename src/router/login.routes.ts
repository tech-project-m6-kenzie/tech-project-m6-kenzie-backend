import { Router } from "express";
import { createLoginController } from "../controllers/sessions/login.controller";

const loginRoutes = Router()

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: API para autenticação de usuários
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginPayload'
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
loginRoutes.post("", createLoginController);

export default loginRoutes