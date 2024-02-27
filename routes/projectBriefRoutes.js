const express=require('express')
const router=express.Router()

const authenticate=require('../middleware/authenticate')
const documentUpload=require("../middleware/documentUpload")
const ProjectBriefController=require('../controllers/projectBriefController')
const ProjectInstituteController=require('../controllers/projectSubControllers/projectInstituteController')
const ProjectHwSwSppController=require('../controllers/projectSubControllers/projectHwSwSppController')
const ProjectMilstoneController=require('../controllers/projectSubControllers/projectMilstoneController')
const ProjectPiDetailsController=require('../controllers/projectSubControllers/projectPi_DetailsController')
const ProjectSystemsDataController=require('../controllers/projectSubControllers/projectSystemsController')
const ProjectFullIBListController=require('../controllers/projectSubControllers/projectFull_Ib_ListController')

//upload Documents

router.post('/document/upload/',documentUpload.array('files'),(req,res)=>{
    res.send(req.files);
})

// For  main project
// router.get('/',authenticate,UserController.index)
router.get('/',ProjectBriefController.index)
router.post('/add',ProjectBriefController.store)
router.post('/update',ProjectBriefController.updateStore)
router.post('/getmyprojects',ProjectBriefController.projectsById)


//for  institute cruds
router.get('/institutes',ProjectInstituteController.index)
router.post('/institutes/add',ProjectInstituteController.store)

//for HwSwSpp cruds
router.get('/hw_sw_spp',ProjectHwSwSppController.index)
router.post('/hw_sw_spp/add',ProjectHwSwSppController.store)

//for Milstone and deliverables
router.get('/milstones',ProjectMilstoneController.index)
router.post('/milstones/add',ProjectMilstoneController.store)

//for Pi details
router.get('/pidetails',ProjectPiDetailsController.index)
router.post('/pidetails/add',ProjectPiDetailsController.store)

//Systems system details
router.get('/systemdetails',ProjectSystemsDataController.index)
router.post('/systemdetails/add',ProjectSystemsDataController.store)

//Full ib list controller
router.get('/fulliblists',ProjectFullIBListController.index)
router.post('/fulliblists/add',ProjectFullIBListController.store)

module.exports=router