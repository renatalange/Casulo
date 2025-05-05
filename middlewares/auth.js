import jwt from 'jsonwebtoken'

const jwt_secret = process.env.jwt_secret

    const auth = (req, res, next) =>{

        const token = req.headers.authorization

        if(!token){
            return res.status(401).json({message: 'Acesso negado'})
        }
        try {
            
            const decoded = jwt.verify(token.replace('Bearer ', ''), jwt_secret)

            req.userId = decoded.id_usuario

            console.log(decoded)

        } catch (error) {
            return res.status(401).json({message: 'Token inválido'})
        }
        next()
    }

export default auth 