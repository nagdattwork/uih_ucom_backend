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
// const backendBase="/"

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
app.use(backendBase+'documents',express.static('documents'))

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
  
  

  app.post(backendBase+'download', (req, res) => {
    const filePath = req.body.url;
    console.log(filePath);
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          
            return res.status(404).json({ error: 'File not found' });
        }

        // Stream the file to the client
        const fileStream = fs.createReadStream(filePath);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename=' + path.basename(filePath));
        fileStream.pipe(res);
    });
});