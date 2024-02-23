const express=require("express")
const mongoose=require("mongoose")
const morgan=require("morgan")
const bodyParser = require("body-parser")
const cors=require('cors')
require('dotenv').config()



const UserRoute=require("./routes/userRoutes")
const ProjectBriefRoute=require("./routes/projectBriefRoutes")

mongoose.connect("mongodb://localhost:27017/ucomdb",{useNewUrlParser:true,useunifiedTopology:true})


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
app.use('/uploads',express.static('uploads'))
app.use('/documents',express.static('documents'))

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
app.use('/api/users',UserRoute)

app.use('/api/projects',ProjectBriefRoute)