const ProjectBriefModels=require("../../models/projectBrief")
const Pi_Details=ProjectBriefModels.Pi_Details_Sechema
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")

// All PI details returns
const index=(req,res,next)=>{
    Pi_Details.find()
    .then((response)=>{
        res.json({
            response:response
        })
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
}


//Add a PI details
const store=(req,res,next)=>{
    const pi_details=new Pi_Details({
        pi_name:req.body.pi_name,
        pi_designation:req.body.pi_designation,
        pi_email:req.body.pi_email,
        pi_phone:req.body.pi_phone,
        pi_signatury_rights:req.body.pi_signatury_rights,
        pi_top_management:req.body.pi_top_management
    })
    pi_details.save()
    .then((response)=>{
        res.json({
            message:"PI details added successfully"
        })
    })
    .catch(err=>{
        res.json({
            message:"An error occured in PI details adding"
        })
    })
}



module.exports={
    index,store
}