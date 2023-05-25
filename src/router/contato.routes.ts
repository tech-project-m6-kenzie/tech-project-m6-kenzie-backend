import { Router } from "express";
 
 
import tokenAuthValidationMiddleware from "../middlewares/tokenAuthValidation.middleware";
import { createContatoController, deleteContatoController,  listContatoByIdController,  listContatosController,  updateContatoController } from "../controllers/contatos/contato.controller";


const contatoRoutes = Router()

contatoRoutes.post("",tokenAuthValidationMiddleware, createContatoController );
contatoRoutes.get("", tokenAuthValidationMiddleware, listContatosController)
contatoRoutes.get("/:id", tokenAuthValidationMiddleware, listContatoByIdController)
contatoRoutes.patch("/:id", tokenAuthValidationMiddleware, updateContatoController)
contatoRoutes.delete("/:id", tokenAuthValidationMiddleware, deleteContatoController);


export default contatoRoutes