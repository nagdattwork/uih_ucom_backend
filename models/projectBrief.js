const mongoose=require('mongoose')
const Schema=mongoose.Schema

//HW/SW support array schema  -core Schema for project_title - controllers available

const hw_sw_spp_scheme = new Schema({
    hw_sw_type:String,
    hw_sw_name:String,
    product_number:String,
    quantity:String,
    license:String,

},{timestamps:true});
//Ethics IRB approval Object Schema  -core Schema for project_title     - dont need controller
const ethics_irb_schema=new Schema({
    approved:Boolean,
    document:String,
    date_of_approval:String,
    ref_no:String,
    date_of_expiry:String,
    exempted_from_irb:Boolean,
    exempted_reason:String,
    reason:String

})

//Milstone/Deliverables Array Schema  -core Schema for project_title    -Controllers available
const milestone_deliverables_schema=new Schema({
    m_d_no:String,
    m_d_title:String,
    delivery_type:String,
    months:String,
    status:String,
    paymentmilstone:String

},{timestamps:true})
//Institute or Hospital Schema  -core Schema for customer_details   - Controllers available
const institute_schema=new Schema({
    institute_name:String,
    institute_country:String,
    institute_city:String,
    institute_address:String,
    institute_email:String,
    institute_phone:String
},{timestamps:true})

//PI details Schema  -core Schema for customer_details      - Controllers available 
const pi_details_schema=new Schema({
    pi_name:String,
    pi_designation:String,
    pi_email:String,
    pi_phone:String,
    pi_signatury_rights:Boolean,
    pi_top_management:Boolean
},{timestamps:true})


//System sytems info Schema  -core Schema for system        - Controllers Available
const systems_schema=new Schema({
    systems_bu:String,
    systems_model:String,
    systems_sr_no:String,
    systems_sw_hw_version:String,
    systems_installation_date:String,
    systems_warranty_status:String
})


//System full IB list  Schema  -core Schema for system  - Controller available
const full_ib_list_schema=new Schema({
    full_ib_sr_no:String,
    full_ib_bu:String,
    full_ib_modality:String,
    full_ib_model:String,
    full_ib_sw_version:String,
    full_ib_installation_date:String,
    full_ib_upgrades:String,
    full_ib_warranty:String
    
})

//FI/Funding funding status Object  -core Schema for fi_funding
const fi_funding_status_object=new Schema({
    fi_funding_funded:Boolean,
    fi_funding_funding_person:String,
    fi_funding_uih_funding_amount:String,
    fi_funding_uih_funding_bu:String,
    fi_funding_uih_funding_bu_aprroval:String,
    fi_funding_customer_invoice:String
})
//Main Schema
const projectBriefSchema=new Schema({


    project_title:{
        title:String,
        description:String,
        objective:String,
        project_manager:[{type:Schema.Types.ObjectId,ref:'User'}],
        project_duration:String,
        // hw_sw_spp:[{type:Schema.Types.ObjectId,ref:'Hw_Sw_SppSchemas'}],
        hw_sw_spp:[hw_sw_spp_scheme,],
       

        current_stage:String,
        ethics_irb_approval:ethics_irb_schema,
        exp_date:String,
        act_start_date:String,
        end_date:String,
        milestone_deliverables:[{type:Schema.Types.ObjectId,ref:'Milestone_Deliverables_Schemas'}],


    },
    customer_details:{
        institutes:[{type:Schema.Types.ObjectId,ref:'InstituteHospitalSchemas'}],
        pi_details:[{type:Schema.Types.ObjectId,ref:'Pi_Details_Sechemas'}],
        existing_projects:String
    },
    system:{
        systems:[{type:Schema.Types.ObjectId,ref:'Systems_Sechemas'}],
        full_ib_list:[{type:Schema.Types.ObjectId,ref:'Full_Ib_List_Schemas'}],
        uih_service_engineer:String 
    },
    fi_funding:{
        fi_funding_status:fi_funding_status_object,
        // fi_uih_uii_funded_amount:String,
        // fi_uih_uii_funded_bu:String,
        // fi_who_funded:String

        
    },
    documents:{
        pdd_document:String,
        draft_agreement:String,
        signed_agreement:String,
        others:String
    },
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    updated_by:{type:Schema.Types.ObjectId,ref:'User'},
  
},{timestamps:true})



const InstituteHospitalSchemas=mongoose.model('InstituteHospitalSchemas',institute_schema)

const Hw_Sw_Spp_Schema=mongoose.model('Hw_Sw_SppSchemas',hw_sw_spp_scheme)

const Milestone_Deliverables_Schema=mongoose.model('Milestone_Deliverables_Schemas',milestone_deliverables_schema)

const Pi_Details_Sechema=mongoose.model('Pi_Details_Sechemas',pi_details_schema)

const Systems_Sechema=mongoose.model('Systems_Sechemas',systems_schema)

const Full_Ib_List_Schema=mongoose.model('Full_Ib_List_Schemas',full_ib_list_schema)

const PrrojectBrief=mongoose.model('PrrojectBrief',projectBriefSchema)
module.exports={PrrojectBrief,InstituteHospitalSchemas,Hw_Sw_Spp_Schema,Milestone_Deliverables_Schema,Pi_Details_Sechema,Systems_Sechema,Full_Ib_List_Schema}