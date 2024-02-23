const ProjectBriefModels=require("../../models/projectBrief")
const ProjectHwSWSpp=ProjectBriefModels.Hw_Sw_Spp_Schema
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")

// All hwswspp returns
//I Dont Need this All
const index=(req,res,next)=>{
    ProjectHwSWSpp.find()
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


//Add a HwSwSpp
const store=(req,res,next)=>{
    const hwswspp=new ProjectHwSWSpp({
        hw_sw_type:req.body.hw_sw_type,
    hw_sw_name:req.body.hw_sw_name,
    product_number:req.body.product_number,
    quantity:req.body.quantity,
    license:req.body.license,
    })
    hwswspp.save()
    .then((response)=>{
        res.json({
            message:"HW/SW support added successfully "
        })
    })
    .catch(err=>{
        res.json({
            message:"An error occured in hw/sw support adding"
        })
    })
}



module.exports={
    index,store
}