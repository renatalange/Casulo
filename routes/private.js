import express from 'express'
import { PrismaClient } from '@prisma/client'

const  router = express.Router()
const prisma = new PrismaClient()

router.get('/listar-usuarios', async (req, res) => {
    try{

    const usuarios = await prisma.usuario.findMany({omit: {id_usuario:true, senha:true, email:true}})

    res.status(200).json({message: 'Usuários listados com sucesso', usuarios})

    }catch(err){
        console.log(err)
        res.status(500).json({message:'Falha no servidor'})
    }
})

export default router