const express=require("express")
const mongoose=require("mongoose")
const morgan=require("morgan")
const bodyParser = require("body-parser")
const cors=require('cors')
const fs = require('fs');
require('dotenv').config()



const UserRoute=require("./routes/userRoutes")
const ProjectBriefRoute=require("./routes/projectBriefRoutes")
const documentUpload=require("./middleware/documentUpload")

const multer = require("multer")
const path = require("path")

mongoose.connect("mongodb://localhost:27017/ucomdb",{useNewUrlParser:true,useunifiedTopology:true})

const backendBase="/server/"
// const backendBase="/server/"

const db=mongoose.connection

db.on("error",(err)=>{
    console.log(err)
})


db.once('open',()=>{
    console.log("Db connected")
})

const app=express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use(backendBase+'uploads',express.static('uploads'))
app.use(backendBase+'/server/documents',express.static('documents'))

// app.use(express.static(path.join(__dirname, './uploads')));
const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on  ${PORT}`)
    // console.log(`And IP is ${http}`)
})


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(backendBase+'api/users',UserRoute)

app.use(backendBase+'api/projects',ProjectBriefRoute)


//delete files

app.delete(backendBase+'test/delete/:filename', (req, res) => {
    const filePath = path.join(__dirname, req.params.filename);
    fs.unlink(filePath, err => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred');
        return;
      }
      res.send('File deleted successfully');
    });
  });

  app.post(backendBase+'/test/upload', documentUpload.array('files'), (req, res) => {
    res.send(req.files);
  });
  
  