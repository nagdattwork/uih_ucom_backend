const ProjectBriefModels=require("../models/projectBrief")
const ProjectBrief=ProjectBriefModels.PrrojectBrief
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")

// All project returns
const index=(req,res,next)=>{
    ProjectBrief.find()
    .populate('project_title.hw_sw_spp')
    .populate('project_title.project_manager')
    .populate('project_title.milestone_deliverables')
    .populate('customer_details.institutes')
    .populate('customer_details.pi_details')
    .populate('system.full_ib_list')
    .populate('system.systems')
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


const projectsById=(req,res,next)=>{
    console.log({_id:req.body.id})
    let condition={}

    if(req.body?.type==='basic'){
        condition={owner:req.body.id}
    }
    ProjectBrief.find(condition)
    .populate('project_title.hw_sw_spp')
    .populate('project_title.project_manager')
    .populate('project_title.milestone_deliverables')
    .populate('customer_details.institutes')
    .populate('customer_details.pi_details')
    .populate('system.full_ib_list')
    .populate('system.systems')
    .populate('owner')
    .populate('updated_by')
    .then((response)=>{
        console.log(response)
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

    console.log(req.body.project_title.title)
    let projectBrief=new ProjectBrief({
        project_title:{
            title:req.body.project_title.title,
            description:req.body.project_title.description,
            objective:req.body.project_title.objective,
            project_duration:req.body.project_title.project_duration,
            current_stage:req.body.project_title.current_stage,
            ethics_irb_approval:req.body.project_title.ethics_irb_approval,
            exp_date:req.body.project_title.exp_date,
            act_start_date:req.body.project_title.act_start_date,
            end_date:req.body.project_title.end_date,
    
    
        },
        customer_details:{
            existing_projects:req.body?.customer_details?.existing_projects,
        },
        
        fi_funding:{
            fi_funding_status:req.body?.fi_funding?.fi_funding_status,
            // fi_uih_uii_funded_amount:req.body?.fi_funding?.fi_uih_uii_funded_amount,
            // fi_uih_uii_funded_bu:req.body?.fi_funding?.fi_uih_uii_funded_bu,
            // fi_who_funded:req.body?.fi_funding?.fi_who_funded
        },
        documents:{
            pdd_document:req.body?.documents?.pdd_document,
            draft_agreement:req.body?.documents?.draft_agreement,
            signed_agreement:req.body?.documents?.signed_agreement,
            others:req.body?.documents?.others
        },
        system:{
            uih_service_engineer:req.body?.system?.uih_service_engineer
        },
        owner:req.body?.owner

        
        

    })
//Project Titles
    req.body?.project_title?.project_manager?.forEach(project_manager => {
        projectBrief.project_title.project_manager.push(project_manager)
    });


    req.body?.project_title?.hw_sw_spp?.forEach(hw_sw_spp => {
        projectBrief.project_title.hw_sw_spp.push(hw_sw_spp)
    });


   req.body?.project_title?.milstone_deliverables?.forEach(milestone_deliverables => {
        projectBrief.project_title.milestone_deliverables.push(milestone_deliverables)
    });

//Customer Details
    req.body?.customer_details?.institutes?.forEach(institute => {
        projectBrief.customer_details.institutes.push(institute)
    });
    req.body?.customer_details?.pi_details?.forEach(pi_detail => {
        projectBrief.customer_details.pi_details.push(pi_detail)
    });
    
//System
req.body?.system?.systems?.forEach(system => {
    projectBrief.system.systems.push(system)
});


req.body?.system?.full_ib_list?.forEach(full_ib_list => {
    projectBrief.system.full_ib_list.push(full_ib_list)
});


// req.body?.system?.uih_service_engineer?.forEach(uih_service_engineer => {
//     projectBrief.system.uih_service_engineer.push(uih_service_engineer)
// });
    projectBrief.save()
    .then((response)=>{
        res.json({
            message:"Project Added Successfully"
        })
    })
    .catch((err)=>{
        res.json({
            message:err
        })
    })
}

//Update Project


const updateStore=(req,res,next)=>{

    console.log(req.body.projectId)
    const projectBrief={
        project_title: {
            title: req.body.project_title.title,
            description: req.body.project_title.description,
            objective: req.body.project_title.objective,
            project_duration: req.body.project_title.project_duration,
            current_stage: req.body.project_title.current_stage,
            ethics_irb_approval: req.body.project_title.ethics_irb_approval,
            exp_date: req.body.project_title.exp_date,
            act_start_date: req.body.project_title.act_start_date,
            end_date: req.body.project_title.end_date,
            project_manager:[],
            hw_sw_spp:[],
            milestone_deliverables:[]
        },
        customer_details: {
            existing_projects: req.body?.customer_details?.existing_projects,
            institutes:[],
            pi_details:[],
        },
        fi_funding: {
            fi_funding_status: req.body?.fi_funding?.fi_funding_status,
        },
        documents: {
            pdd_document: req.body?.documents?.pdd_document,
            draft_agreement: req.body?.documents?.draft_agreement,
            signed_agreement: req.body?.documents?.signed_agreement,
            others: req.body?.documents?.others
        },
        system: {
            uih_service_engineer: req.body?.system?.uih_service_engineer,
            systems:[],
            full_ib_list:[]
        },
        owner: req.body?.owner,
        updated_by: req.body?.updated_by,
    }

    //Project Titles
    req.body?.project_title?.project_manager?.forEach(project_manager => {
        projectBrief.project_title.project_manager.push(project_manager)
    });


    req.body?.project_title?.hw_sw_spp?.forEach(hw_sw_spp => {
        projectBrief.project_title.hw_sw_spp.push(hw_sw_spp)
    });


   req.body?.project_title?.milstone_deliverables?.forEach(milestone_deliverables => {
        projectBrief.project_title.milestone_deliverables.push(milestone_deliverables)
    });

//Customer Details
    req.body?.customer_details?.institutes?.forEach(institute => {
        projectBrief.customer_details.institutes.push(institute)
    });
    req.body?.customer_details?.pi_details?.forEach(pi_detail => {
        projectBrief.customer_details.pi_details.push(pi_detail)
    });
    
//System
req.body?.system?.systems?.forEach(system => {
    projectBrief.system.systems.push(system)
});


req.body?.system?.full_ib_list?.forEach(full_ib_list => {
    projectBrief.system.full_ib_list.push(full_ib_list)
});

    ProjectBrief.findByIdAndUpdate(req.body.projectId, {
        $set: 
        projectBrief
        
    }, { new: true })
    .then((result) => {
        res.json({
            result: "Updated Successfully"
        })
    }).catch(err => {
        console.log(err)
        res.json({
            err
        })
    });

}


//delete Project

const deleteProjectById = (req, res,next) => {

        ProjectBrief.findByIdAndDelete(req.body.projectId).then((result) => {
            res.json({
                result: "Deleted Successfully"
            })
        })

}


//Dashboard- Groupping by project status




module.exports={
    index,store,updateStore,projectsById,deleteProjectById
}