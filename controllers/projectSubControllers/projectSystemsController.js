const ProjectBriefModels=require("../../models/projectBrief")
const SystemsData=ProjectBriefModels.Systems_Sechema
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")

// All System details returns
const index=(req,res,next)=>{
    SystemsData.find()
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


//Add a System details
const store=(req,res,next)=>{
    const system=new SystemsData({
        systems_bu:req.body.systems_bu,
        systems_model:req.body.systems_model,
        systems_sr_no:req.body.systems_sr_no,
        systems_sw_hw_version:req.body.systems_sw_hw_version,
        systems_installation_date:req.body.systems_installation_date,
        systems_warranty_status:req.body.systems_warranty_status
    })
    system.save()
    .then((response)=>{
        res.json({
            message:"system's system data added successfully"
        })
    })
    .catch(err=>{
        res.json({
            message:"An error occured in system's system detail adding"
        })
    })
}



module.exports={
    index,store
}