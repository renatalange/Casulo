import express from 'express';
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import auth from './middlewares/auth.js'

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// use `prisma` in your application to read and write data in your DB
import dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use(express.json())
app.use('/', publicRoutes)
app.use('/', auth, privateRoutes)

//3 rotas: cadastro, login e listar usuários
//privada: listar
//publicas: cadastro e login

app.listen(4001, () => console.log("Servidor rodando"))