const ImportantDocs = require("../models/importentDocs")
const fs = require('fs');


const addFile = (req, res, next) => {
    console.log(req.doc_type)
    const importantDocs = new ImportantDocs({
        doc_type:req.body.doc_type,
        path:req.file.path
    })
    importantDocs.save().then((result)=>{
        res.json({result})
    })
}


const getFiles = (req, res, next) => {
   ImportantDocs.find().then((response)=>{
    res.json({response})
   })
}


module.exports = {addFile,getFiles}