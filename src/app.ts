import "reflect-metadata"
import "express-async-errors"
import express from "express"
import handleErrorMiddleware from "./middlewares/handleErrors.middleware"
import userRoutes from "./router/user.routes"
import loginRoutes from "./router/login.routes"
import contatoRoutes from "./router/contato.routes"
import telefoneRoutes from "./router/telefone.routes"
import { createSwaggerSpec } from "../swagger"



const app = express()
app.use(express.json())


app.use('/users', userRoutes)
app.use('/login', loginRoutes)
app.use('/contatos', contatoRoutes)
app.use('/telefones', telefoneRoutes)
createSwaggerSpec(app);


app.use(handleErrorMiddleware)


export default app