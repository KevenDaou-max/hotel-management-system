const jwt = require("jsonwebtoken")
function requireAuth(req,res,next){
    const header=req.headers.authorization
    if(!header){
        return res.status(401).json({error:"no token provided"})
    }
    const token=header.split(" ")[1]
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET)
                req.userId = payload.id
                req.userRole = payload.role
                next()}
                catch(err){
                    return res.status(401).json({error:"invalid or expired token"})
    }
}
function requireStaff(req,res,next){
    if(req.userRole!=='staff'){
        return res.status(403).json({error:"Staff only"})

    }
    next()
}
module.exports={requireAuth,requireStaff}