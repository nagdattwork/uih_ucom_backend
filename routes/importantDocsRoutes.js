const express=require('express')
const router=express.Router()

const authenticate=require('../middleware/authenticate')

const ImportantDocsController=require('../controllers/importantDocsControllers')

const upload=require("../middleware/upload")

// router.get('/',authenticate,UserController.index)
router.post('/addfile',upload.single('file'),ImportantDocsController.addFile)
router.get('/getfiles',ImportantDocsController.getFiles)



module.exports=router