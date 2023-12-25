const express = require("express");
const StudentsController = require("../controllers/StudentsController");
const WorksController = require("../controllers/WorksController")
const AuthVerifyMiddleware = require("../middleWare/AuthVerifyMiddlewate");
const router = express.Router();

router.post("/createStudentProfile", StudentsController.createStudentProfile);
router.post("/userLogin", StudentsController.userLogin);
router.get("/readStudentProfile",AuthVerifyMiddleware, StudentsController.readStudentProfile);
router.post("/updateStudentProfile", AuthVerifyMiddleware, StudentsController.updateStudentProfile);

router.get("/recoverVerifyEmail/:email", StudentsController.recoverVerifyEmail);
// router.get("/recoverVerifyOTP/:email/:otp", StudentsController.recoverVerifyOTP);
// router.post("/recoverResetPass", StudentsController.recoverResetPass);


router.post("/DeleteStudentProfile", AuthVerifyMiddleware, StudentsController.DeleteStudentProfile);


router.post("/createWork", AuthVerifyMiddleware, WorksController.createWork);
router.get("/readWork", AuthVerifyMiddleware, WorksController.readWork);
router.post("/updateWork/:id", AuthVerifyMiddleware, WorksController.updateWork);
router.post("/deleteWork/:id", AuthVerifyMiddleware, WorksController.deleteWork);
module.exports= router;
