const path=require('path')
const multer= require('multer')
var storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'documents/')
    },
    filename:function(req,file,cb){
        console.log(file)
        let ext=path.extname(file.originalname)
        cb(null,Date.now()+"."+file.originalname.split(".")[0]+ext)
    }
})


var documentUpload=multer({
    storage:storage,
    // fileFilter: function(req,file,callback){
    //     if(file.mimetype=='image/png' || file.mimetype=='image/jpg'){
    //         callback(null,true)
    //     }
    //     else{
    //         console.log("Invalid File type")
    //         callback(null,false)
    //     }
    // } 
    
})

module.exports=documentUpload