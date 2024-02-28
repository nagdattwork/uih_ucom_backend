
const User=require("../models/user")
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")
//get all users
const index=(req,res,next)=>{
    User.find()
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

// Store a user
const store=(req,res,next)=>{
    console.log(req.body)
  bcrypt.hash(req.body.password,10,(err,hashedPass)=>{
    if(err){
        res.json({error:err})
    }

    let user=new User({
        fname:req.body.fname,
        lname:req.body.lname,
        uname:req.body.uname,
        password:hashedPass,
        roles:req.body.roles,
        email:req.body.email,
        region:req.body.region,
        specialization:req.body.specialization,
        country:req.body.country,
        

    })
    if(req.file){
        user.image=req.file.path
    }
    user.save()
    .then((response)=>{
        res.json({
            message:"User Added Successfully"
        })
    })
    .catch((err)=>{
        res.json({
            message:err
        })
    })




  })

}


//update a user

const update=(req,res,next)=>{
    let userId=req.body.userID

    let updatedUser={
        fname:req.nody.fname,
        lname:req.nody.lname,
        uname:req.nody.uname,
       
    
    }
    User.findByIdAndUpdate(userId,{$set:updatedUser})
    .then((res)=>{
      res.json({
        message:"User updated successfully"
      })
      .catch((err)=>{
        res.json({
            message:"An error occured"
        })
      })
    })
}


//delete user

const deleteUser=(req,res,next)=>{
    let userId=req.body.userId

    User.findByIdAndDelete(userId)

    .then((res)=>{
        res.json({
            message:"User removed Successfully"
        })
    })
    .catch(err=>{
        res.json({
            message:" An error occured"
        })
    })
}


//Login 

const login=(req,res,next)=>{
    var uname=req.body.username
    var password=req.body.password
    console.log(uname,password)

    User.findOne({$or:[{email:uname},{uname:uname}]})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
            if(err){
                res.json({
                    message:"login error"
                })
            }
            if(result){
                let token=jwt.sign({user:user.name},'uCom_uih_project',{expiresIn:'1hr'})
                res.json({
                    message:"Login successfull",
                    token,
                    user
                })
            }
            else{
                res.json({
                    message:"Password does not matched",
                    
                })
            }
            })
        }
        else{
            res.json({
                message:'No user Found'
            })
        }
    })
}

module.exports={
    index,store,update,deleteUser,login
}