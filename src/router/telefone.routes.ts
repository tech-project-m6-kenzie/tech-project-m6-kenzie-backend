import { Router } from "express";
 
import tokenAuthValidationMiddleware from "../middlewares/tokenAuthValidation.middleware";
import { deleteTelefoneController, listTelefonesByIdController, listTelefonesController, updateTelefoneController } from "../controllers/telefones/telefone.controller";

const telefoneRoutes = Router()

 
telefoneRoutes.get("", tokenAuthValidationMiddleware, listTelefonesController)
telefoneRoutes.get("/:id", tokenAuthValidationMiddleware, listTelefonesByIdController)
telefoneRoutes.patch("/:id", tokenAuthValidationMiddleware, updateTelefoneController)
telefoneRoutes.delete("/:id", tokenAuthValidationMiddleware, deleteTelefoneController);


export default telefoneRoutes