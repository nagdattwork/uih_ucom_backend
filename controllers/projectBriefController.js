const ProjectBriefModels = require("../models/projectBrief")
const ProjectBrief = ProjectBriefModels.PrrojectBrief
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const mongoose=require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
// All project returns
const index = (req, res, next) => {
    ProjectBrief.find()
        .populate('project_title.hw_sw_spp')
        .populate('project_title.project_manager')
        .populate('project_title.milestone_deliverables')
        .populate('customer_details.institutes')
        .populate('customer_details.pi_details')
        .populate('system.full_ib_list')
        .populate('system.systems')
        .then((response) => {
            res.json({
                response: response
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}


const projectsById = (req, res, next) => {
    let condition = {}

    if (req.body?.type === 'basic') {
        condition = { owner: req.body.id }
    }
    ProjectBrief.find(condition).sort({ _id: -1 })
        .populate('project_title.hw_sw_spp')
        .populate('project_title.project_manager')
        .populate('project_title.milestone_deliverables')
        .populate('customer_details.institutes')
        .populate('customer_details.pi_details')
        .populate('system.full_ib_list')
        .populate('system.systems')
        .populate('owner')
        .populate('updated_by')
        .then((response) => {
            res.json({
                response: response
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}



//Add a project
const store = (req, res, next) => {

    let projectBrief = new ProjectBrief({
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


        },
        customer_details: {
            existing_projects: req.body?.customer_details?.existing_projects,
        },

        fi_funding: {
            fi_funding_status: req.body?.fi_funding?.fi_funding_status,
            // fi_uih_uii_funded_amount:req.body?.fi_funding?.fi_uih_uii_funded_amount,
            // fi_uih_uii_funded_bu:req.body?.fi_funding?.fi_uih_uii_funded_bu,
            // fi_who_funded:req.body?.fi_funding?.fi_who_funded
        },
        documents: {
            pdd_document: req.body?.documents?.pdd_document,
            draft_agreement: req.body?.documents?.draft_agreement,
            signed_agreement: req.body?.documents?.signed_agreement,
            others: req.body?.documents?.others,
            pdd_details: req.body?.documents?.pdd_details,
            da_ag_type: req.body?.documents?.da_ag_type,
            da_ag_owner: req.body?.documents?.da_ag_owner,
            sa_details: req.body?.documents?.sa_details,
            other_details: req.body?.documents?.other_details,
        },
        system: {
            uih_service_engineer: req.body?.system?.uih_service_engineer
        },
        owner: req.body?.owner,
        outcomes:{
            milstones_docs:req.body.outcomes.milstones_docs,
            patents_docs:req.body.outcomes.patents_docs,
            articles_docs:req.body.outcomes.articles_docs,
            abstracts_docs:req.body.outcomes.abstracts_docs,
        }




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


    //outcomes

    req.body?.outcomes?.milstones?.forEach(mil => {
        projectBrief.outcomes.milstones.push(mil)
    });

    req.body?.outcomes?.patents?.forEach(mil => {
        projectBrief.outcomes.patents.push(mil)
    });
    req.body?.outcomes?.articles?.forEach(arti => {
        projectBrief.outcomes.articles.push(arti)
    });
    req.body?.outcomes?.abstracts?.forEach(arti => {
        projectBrief.outcomes.abstracts.push(arti)
    });




    // req.body?.system?.uih_service_engineer?.forEach(uih_service_engineer => {
    //     projectBrief.system.uih_service_engineer.push(uih_service_engineer)
    // });
    projectBrief.save()
        .then((response) => {
            res.json({
                message: "Project Added Successfully"
            })
        })
        .catch((err) => {
            res.json({
                message: err
            })
        })
}

//Update Project


const updateStore = (req, res, next) => {

        // console.log(req.body.outcomes)
    const projectBrief = {
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
            project_manager: [],
            hw_sw_spp: [],
            milestone_deliverables: []
        },
        customer_details: {
            existing_projects: req.body?.customer_details?.existing_projects,
            institutes: [],
            pi_details: [],
        },
        fi_funding: {
            fi_funding_status: req.body?.fi_funding?.fi_funding_status,
        },
        documents: {
            pdd_document: req.body?.documents?.pdd_document,
            draft_agreement: req.body?.documents?.draft_agreement,
            signed_agreement: req.body?.documents?.signed_agreement,
            others: req.body?.documents?.others,
            
            pdd_details: req.body?.documents?.pdd_details,
            da_ag_type: req.body?.documents?.da_ag_type,
            da_ag_owner: req.body?.documents?.da_ag_owner,
            sa_details: req.body?.documents?.sa_details,
            other_details: req.body?.documents?.other_details,


            
            
        },
        system: {
            uih_service_engineer: req.body?.system?.uih_service_engineer,
            systems: [],
            full_ib_list: []
        },
        owner: req.body?.owner,
        updated_by: req.body?.updated_by,
        outcomes:{
            milstones:[],
            patents:[],
            articles:[],
            abstracts:[],
            abstracts_docs:req.body.outcomes.abstracts_docs,
            articles_docs:req.body.outcomes.articles_docs,
            milstones_docs:req.body.outcomes.milstones_docs,
            patents_docs:req.body.outcomes.patents_docs,




        }
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


    //outcomes
    req.body?.outcomes?.milstones?.forEach(mil => {
        console.log(mil,"inside mil")

        projectBrief.outcomes.milstones.push(mil)
    });

    req.body?.outcomes?.patents?.forEach(mil => {
        projectBrief.outcomes.patents.push(mil)
    });
    req.body?.outcomes?.articles?.forEach(arti => {
        projectBrief.outcomes.articles.push(arti)
    });
    req.body?.outcomes?.abstracts?.forEach(arti => {
        projectBrief.outcomes.abstracts.push(arti)
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

const deleteProjectById = (req, res, next) => {

    ProjectBrief.findByIdAndDelete(req.body.projectId).then((result) => {
        res.json({
            result: "Deleted Successfully"
        })
    })

}


//Dashboard- Groupping by project status

const currentStageDashes = (req, res, next) => {
    let conditions = {}
    
    let pipeline = [
        {
            $group: {
                _id: '$project_title.current_stage',
                count: { $sum: 1 }
            }
             
        }
    ];

    if (req.body?._id) {
        const objId=new  ObjectId(req.body._id)
        conditions = { owner: objId }
        pipeline = [
            {
                $match: conditions
            },
            {
                $group: {
                    _id: '$project_title.current_stage',
                    count: { $sum: 1 }
                }
                 
            },
           
        ];

        // ProjectBrief.find(conditions).then(rest=>res.json({rest}))
        // return
    }

    console.log(pipeline);
    ProjectBrief.aggregate(pipeline).then((result) => {
        console.log(result)
        res.json({
            result: result
        }
        )

    })
}

const returnFreshString = (string) => {
    let temp = string
    temp = temp?.replaceAll("undefined", "")
    temp = temp?.replaceAll(",", "")

    return temp
}

const documentsPercentDashes = (req, res, next) => {


    let conditions = {}
    if (req.body?._id) {
        conditions = { owner: req.body._id }
    }
    ProjectBrief.find(conditions).then((result) => {
        let pdd_count = 0
        let da_count = 0
        let original_count = 0
        let sa_count = 0
        let others=0
        result.map(current => {


            if (current?.documents?.pdd_document !== "") {


                if (returnFreshString(current?.documents?.pdd_document) !== "")
                    pdd_count++
            }

            if (current?.documents?.draft_agreement !== "") {

                if (returnFreshString(current?.documents?.draft_agreement) !== "")
                    da_count++
            }

            if (current?.documents?.signed_agreement !== "") {

                if (returnFreshString(current?.documents?.signed_agreement) !== "")
                    sa_count++
            }

            if (current?.documents?.others !== "") {

                if (returnFreshString(current?.documents?.others) !== "")
                others++
            }




            original_count++
        })


        res.json({
            pdd_count: {
                count:pdd_count,
                original_count
            },
            da_count: {
                count:da_count,
                original_count
            },
            sa_count: {
                count:sa_count,
                original_count
            },
            others: {
                count:others,
                original_count
            },
            
        })
    })
}

const fundingOwnerDashes = (req, res, next) => {


    let conditions = {}
    if (req.body?._id) {
        conditions = { owner: req.body._id }
    }
    ProjectBrief.find(conditions).then((result) => {
      let uii=0
      let uih=0
      let other=0

      result.map(current => {

        // console.log(current.fi_funding?.fi_funding_status)
        if (current?.fi_funding?.fi_funding_status?.fi_funding_funding_person === "UII") {
          uii++
        }
        if (current?.fi_funding?.fi_funding_status?.fi_funding_funding_person === "UIH") {
          uih++
        }
        if (current?.fi_funding?.fi_funding_status?.fi_funding_funding_person === "OTHERS") {
          other++
        }
      })

      res.json({
        uii,
        uih,
        other
      })
    })
}


module.exports = {
    index, store, updateStore, projectsById, deleteProjectById, currentStageDashes, documentsPercentDashes,fundingOwnerDashes
}