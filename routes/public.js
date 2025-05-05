import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

const jwt_secret = process.env.jwt_secret
//cadastro

router.post('/cadastro', async (req, res) => {
    try{

    const usuario = req.body

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(usuario.senha, salt)

    const userDB = await prisma.usuario.create({
        data:{
            email: usuario.email,
            nome: usuario.nome,
            nome_usuario: usuario.nome_usuario,
            senha: hashPassword,
        },
    })

        res.status(201).json(userDB)
    }
    catch(err){
        res.status(500).json({message:"Erro no Servidor, tente novamente"})
    }
})

//login
router.post('/login', async (req, res) =>{
    try{
    const userInfo = req.body
    //Busca usuário no banco
    const usuario = await prisma.usuario.findUnique({
        where: {email: userInfo.email},
    })
    //verifica se o usuário existe dentro do banco
    if(!usuario){
        return res.status(404).json({message: "Usuário não encontrado"})
    }
    //verifica se a senha do banco é igual a que o usuário digitou
    const isMatch = await bcrypt.compare(userInfo.senha, usuario.senha)
    if(!isMatch){
        return res.status(400).json({message: 'senha inválida'})
    }
    //gerar o token JWT

    const token = jwt.sign({id: usuario.id}, jwt_secret, {expiresIn: '30 days'})

    res.status(200).json(token)

    }catch(err){
        res.status(500).json({message:"Erro no servidor, tente novamente"})
    }
})


export default router