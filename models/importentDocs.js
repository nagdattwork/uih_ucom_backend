const mongoose = require('mongoose')
const Schema = mongoose.Schema

//HW/SW support array schema  -core Schema for project_title - controllers available

const importantDocs = new Schema({
    doc_type:String,
    path:String,
},{timestamps:true})
const ImportantDocs=mongoose.model('ImportantDocs',importantDocs)

module.exports =ImportantDocs