import { Router } from "express";
import { deleteUserController, listAllUsersController, listAllUsersControllerActive, listUserController,   updateUserController, userCreateController } from "../controllers/users/user.controller";

import adminValidationMiddleWare from "../middlewares/adminValidation.middleware";
import isActiveValidationMiddleWare from "../middlewares/isActiveValidation.middleware";
import tokenAuthValidationMiddleware from "../middlewares/tokenAuthValidation.middleware";


const userRoutes = Router()

userRoutes.post("", userCreateController );
userRoutes.get("/user", tokenAuthValidationMiddleware, listUserController)
userRoutes.get("", tokenAuthValidationMiddleware, adminValidationMiddleWare, listAllUsersController)
userRoutes.get("/active", tokenAuthValidationMiddleware, adminValidationMiddleWare, listAllUsersControllerActive)
userRoutes.patch("/:id", tokenAuthValidationMiddleware, updateUserController)
userRoutes.delete("/:id", tokenAuthValidationMiddleware, adminValidationMiddleWare, isActiveValidationMiddleWare, deleteUserController);


export default userRoutes