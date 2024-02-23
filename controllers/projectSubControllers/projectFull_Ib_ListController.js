const ProjectBriefModels=require("../../models/projectBrief")
const Full_Ib_List=ProjectBriefModels.Full_Ib_List_Schema
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")

// All full ib list details returns
const index=(req,res,next)=>{
    Full_Ib_List.find()
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


//Add a full ib list details
const store=(req,res,next)=>{
    const full_ib_list=new Full_Ib_List({
        full_ib_sr_no:req.body.full_ib_sr_no,
    full_ib_bu:req.body.full_ib_bu,
    full_ib_modality:req.body.full_ib_modality,
    full_ib_model:req.body.full_ib_model,
    full_ib_sw_version:req.body.full_ib_sw_version,
    full_ib_installation_date:req.body.full_ib_installation_date,
    full_ib_upgrades:req.body.full_ib_upgrades,
    full_ib_warranty:req.body.full_ib_warranty
    })
    full_ib_list.save()
    .then((response)=>{
        res.json({
            message:"Full IB list data added successfully"
        })
    })
    .catch(err=>{
        res.json({
            message:"An error occured in Full IB list data adding"
        })
    })
}



module.exports={
    index,store
}