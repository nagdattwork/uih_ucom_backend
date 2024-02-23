const ProjectBriefModels=require("../../models/projectBrief")
const ProjectMilestone_Deliverables=ProjectBriefModels.Milestone_Deliverables_Schema
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")

// All Milstones returns
const index=(req,res,next)=>{
    ProjectMilestone_Deliverables.find()
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


//Add a Milstone
const store=(req,res,next)=>{
    const milstones=new ProjectMilestone_Deliverables({
        m_d_no:req.body.m_d_no,
        m_d_title:req.body.m_d_title,
        delivery_type:req.body.delivery_type,
        months:req.body.months,
        status:req.body.status,
        paymentmilstone:req.body.paymentmilstone
    })
    milstones.save()
    .then((response)=>{
        res.json({
            message:"Milstones added successfully"
        })
    })
    .catch(err=>{
        res.json({
            message:"An error occured in Milstone adding"
        })
    })
}



module.exports={
    index,store
}