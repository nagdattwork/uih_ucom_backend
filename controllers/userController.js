
const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const initPath = require("path")
const fs = require('fs');

//get all users
const index = (req, res, next) => {
    User.find()
    .sort({ _id: -1 })
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

// Store a user
const store = (req, res, next) => {
    // console.log(req.body)

    let bool=false
    User.findOne({email: req.body.email}).then((response) => {
        console.log(response)
        if(response!==null) 
 {       res.json({
            message:"UAE"
        })
 }   
 else{
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({ error: err })
        }

        let user = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            uname: req.body.uname,
            password: hashedPass,
            email: req.body.email,
            region: req.body.region,
            specialization: req.body.specialization,
            country: req.body.country,
            userType:req.body.userType,
            approved:req.body.approved



        })
        if (req.file) {
            user.image = req.file.path
        }
        user.save()
            .then((response) => {
                res.json({
                    message: "User Added Successfully"
                })
            })
            .catch((err) => {
                res.json({
                    message: err
                })
            })




    })
 }

    })
   

}


//update a user

const update = (req, res, next) => {
    let userId = req.body.userId

    let updatedUser = {
        fname: req.body?.fname,
        lname: req.body?.lname,
        uname: req.body?.uname,
        country:req.body?.country,
        specialization:req.body?.specialization,
        region:req.body?.region


    }
    User.findByIdAndUpdate(userId, { $set: updatedUser })
        .then((result) => {
            res.json({
                message: "User updated successfully"
            })
        })
                .catch((err) => {
                    res.json({
                        message: "An error occured"
                    })
                })
        
}

//Approve Status
const updateApproval = (req, res, next) => {
    let userId = req.body.id

    let updatedUser = {
       approved:true,


    }
    if(req.body.userType   )
    {
        updatedUser = {
            ...updatedUser, // Spread the existing properties of data
            userType: req.body.userType
        }
       
    }
    User.findByIdAndUpdate(userId, { $set: updatedUser })
        .then((result) => {
            res.json({
                message: "User updated successfully"
            })
        })
                .catch((err) => {
                    res.json({
                        message: "An error occured"
                    })
                })
        
}



//Updating Profile Picture
const updateDp = (req, res, next) => {
    let userId = req.body.userId
    console.log(req.file, req.body)
    if (!req.file && !req.body.deleted) return res.json({
        message: "Invalid Files"
    })
    let updatedUser = {}
    let path = ""
    if (req.file) {
        console.log(req.file)
        updatedUser = {         image: req.file.path,       }
        path = req.file.path
    }
    else {
        updatedUser = { image: "",  }
    }

    const filePath = initPath.join('', req.body.filename);
    fs.unlink(filePath, err => {
        if (err) {
            console.error(err,"File Not found");
            // return res.json({
            //     message:"Something wrong occured"
            // })

        }
         
           {
            User.findByIdAndUpdate(userId, { $set: updatedUser })
            .then((user) => {
                user.image = path;
                return user.save();
            })
            .then(() => {
                res.json({
                    message: "Users Image updated successfully",
                    path: path
                });
            })
            .catch((err) => {
                console.log("Wrong Happed")
                res.status(500).json({
                    message: "An error occurred"
                });
            });
           }
    });

   

}

//delete user

const deleteUser = (req, res, next) => {
    let userId = req.body.userId

    User.findByIdAndDelete(userId)

        .then((res) => {
            res.json({
                message: "User removed Successfully"
            })
        })
        .catch(err => {
            res.json({
                message: " An error occured"
            })
        })
}


//Login 

const login = (req, res, next) => {
    var uname = req.body.username
    var password = req.body.password
    console.log(uname, password)

    User.findOne({ $or: [{ email: uname }, { uname: uname }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            message: "login error"
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ user: user.name }, 'uCom_uih_project', { expiresIn: '1hr' })
                        res.json({
                            message: "Login successfull",
                            token,
                            user
                        })
                    }
                    else {
                        res.json({
                            message: "Password does not matched",

                        })
                    }
                })
            }
            else {
                res.json({
                    message: 'No user Found'
                })
            }
        })
}

module.exports = {
    index, store, update, deleteUser, login, updateDp,updateApproval
}