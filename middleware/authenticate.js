const jwt=require('jsonwebtoken')



const authenticate=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1]
        console.log(token)
        const decode=jwt.verify(token,'uCom_uih_project')

        res.user=decode
        next()
    }
    catch(error){
        res.json({
            message:"Authentication failed"
        })
    }
}

module.exports=authenticate