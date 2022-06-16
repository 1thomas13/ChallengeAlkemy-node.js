import jwt from 'jsonwebtoken'

export const  validateToken = (req,res,next) => {
    
    let token = req.headers.authorization

    if(!token) {
        return res.status(401).json({msg: 'you must log in'})
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, process.env.PASS_JWT, function(err, decoded) {
        if(err) return res.status(401).json({msg: 'Invalid Token'})
        
        req.token = token

        next()
    });

}

