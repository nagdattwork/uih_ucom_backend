const ProjectBriefModels=require("../../models/projectBrief")
const ProjectInstituteHospital=ProjectBriefModels.InstituteHospitalSchemas
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")

// All project returns
const index=(req,res,next)=>{
    ProjectInstituteHospital.find()
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


//Add a project
const store=(req,res,next)=>{
    const institutes=new ProjectInstituteHospital({
        institute_name:req.body.institute_name,
        institute_country:req.body.institute_country,
        institute_city:req.body.institute_city,
        institute_address:req.body.institute_address,
        institute_email:req.body.institute_email,
        institute_phone:req.body.institute_phone
    })
    institutes.save()
    .then((response)=>{
        res.json({
            message:"Institutes added successfully"
        })
    })
    .catch(err=>{
        res.json({
            message:"An error occured in institute adding"
        })
    })
}



module.exports={
    index,store
}