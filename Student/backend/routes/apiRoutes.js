const express = require('express');
const router = express.Router();


const { postStaffRegistration, getAllStaff, updateStaff, getOneStaffUser, deleteStaffUser, StaffLogin, getAllSupervisors, getStaffDetails } = require('../Controller/staffController')

const { getSETopics, getITTopics, getCSTopics, getCSNETopics } = require('../Controller/submissionsController');


const { postMesage, getMsgfillter, getbyDatebySennder, updateStats, getUsersBySeenStatus } = require('../Controller/messsage')
const { postMainStaffRegistration, mainStaffLogin } = require('../Controller/mainStaff')
// const { postStaffRegistration , getAllStaff ,updateStaff , getOneStaffUser , deleteStaffUser , StaffLogin} = require('../Controller/staffController')

const { getHistoryMsgByName, postHistoryMesage, getHistoryMsgBySennder } = require('../Controller/msgHistoryController')
const { getStudentDetails } = require('../Controller/studentMsgController')
const { postTypnigMesage, getTypingStatus, updateByTypnigMsg, getAllobjects } = require('../Controller/MessageTypngConroller')

const { getOnereserchbySupervisors, updateReserchbyPending } = require('../Controller/reserchTopicsController')
const { getGroupDetailsByName } = require('../Controller/groupcontoleller')
const { postMarkings, getMarking, getMarkingcategoryA, getMarkingcategoryB, getMarkingcategoryC, getMarkingcategoryD, getAMarking, updateMarking, deleteMarking } = require('../Controller/markingSchemaConroller')
const {postEvaluation} = require('../Controller/eveluationConroller')
const {getPaneletailsByName , getPaneletailsByID} = require('../Controller/panelController')




/*Main Staff registration */
router.post("/mainstaffRegister/post", postMainStaffRegistration);
router.post("/mainstaffRegister/login", mainStaffLogin);


/*Staff registration */

router.post("/staffRegister/post", postStaffRegistration);
router.get("/staffRegister/get", getAllStaff);
router.put("/staffRegister/update/:id", updateStaff);
router.post("/staffRegister/getuser", getOneStaffUser);
router.delete("/staffRegister/delete/:id", deleteStaffUser);
router.post("/staffRegister/login", StaffLogin);
router.get("/staffRegister/supervisor", getAllSupervisors);
router.post("/msgHistory/getStaff", getStaffDetails);


/* Message */
router.post("/message/post", postMesage);
router.post("/message/get", getMsgfillter);
router.post("/message/get/sennder", getbyDatebySennder);
router.put("/message/update/:id", updateStats);


router.post("/msgHistory/post", postHistoryMesage);
router.post("/msgHistory/get", getHistoryMsgByName);
router.post("/msgHistory/getbySennder", getHistoryMsgBySennder);
router.post("/msgHistory/getStudent", getStudentDetails);
router.post("/msgHistory/getUsersBySeen", getUsersBySeenStatus);


/* Message typnig */

router.post("/msgTyping/post", postTypnigMesage);
router.post("/msgTyping/get", getTypingStatus);
router.post("/msgTyping/update", updateByTypnigMsg);
router.get("/msgTyping/", getAllobjects);

//research Topics
router.get("/topics/getSE", getSETopics)
router.get("/topics/getIT", getITTopics)
router.get("/topics/getCS", getCSTopics)
router.get("/topics/getCSNE", getCSNETopics)

/* reserch topics */
router.post("/reserchTpoic/getbySup", getOnereserchbySupervisors);
// router.post("/reserchTpoic/getbySup/name",getOnereserchbySupervisorsPending);

/* group details */
router.post("/groupDetails/get", getGroupDetailsByName);
router.put("/groupDetails/update/:id", updateReserchbyPending);


/*Marking Scheme routes */

router.post("/markings/create", postMarkings)
router.get("/markings/get", getMarking)
router.get("/markings/getcategoryA", getMarkingcategoryA)
router.get("/markings/getcategoryB", getMarkingcategoryB)
router.get("/markings/getcategoryC", getMarkingcategoryC)
router.get("/markings/getcategoryD", getMarkingcategoryD)
router.get("/markings/get/:id", getAMarking)
router.put("/markings/update/:id", updateMarking)
router.delete("/markings/delete/:id", deleteMarking)


/* group details */
router.post("/eveluation/post",postEvaluation);


/*panel details */
router.post("/panel/getbyname",getPaneletailsByName);
router.post("/panel/getbyId",getPaneletailsByID);


module.exports = router;