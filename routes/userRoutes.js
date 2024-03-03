const express=require('express')
const router=express.Router()

const authenticate=require('../middleware/authenticate')

const UserController=require('../controllers/userController')

const upload=require("../middleware/upload")

// router.get('/',authenticate,UserController.index)
router.get('/',UserController.index)

router.post('/add',upload.single('image'),UserController.store)
router.post('/update',UserController.update)
router.post('/approval',UserController.updateApproval)

router.post('/updatedp',upload.single('image'),UserController.updateDp)

router.post('/delete',UserController.deleteUser)
router.post('/login',UserController.login)

module.exports=router