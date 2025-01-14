import { Router } from "express";
const postRoutine  = require("../controllers/routinesControllers/postRoutine");
const getUserRoutines= require('../controllers/routinesControllers/getUserRoutines')
const getAllRoutines= require('../controllers/routinesControllers/getAllRoutines')
const addUserRoutine = require('../controllers/routinesControllers/addUserRoutine')
const putActiveRoutine= require('../controllers/routinesControllers/putDeleteRutine')
const putChangesInRoutine = require('../controllers/routinesControllers/putChangesInRoutine')
const deleteSavedRoutine = require('../controllers/routinesControllers/deleteSavedRoutine')
const putUserRoutineDate = require('../controllers/routinesControllers/putRoutine_users_date')


const checkToken = require('../middlewares/authentications')
const checkRole = require('../middlewares/checkRole')
const getRoutineById = require('../controllers/routinesControllers/getRoutineById')

const routinesRoutes = Router()
routinesRoutes.post('/postRoutine', postRoutine); 
routinesRoutes.post('/addUserRoutine', addUserRoutine);
routinesRoutes.get('/getAllRoutines', getAllRoutines);
routinesRoutes.put('/putDeleteRoutine',checkToken, checkRole(["Admin", "trainer"]), putActiveRoutine);
routinesRoutes.put('/putChangesInRoutine',checkToken, checkRole(["Admin", "trainer"]), putChangesInRoutine);
routinesRoutes.delete('/deleteSavedRoutine', deleteSavedRoutine);
routinesRoutes.get('/getUserRoutines', getUserRoutines);
routinesRoutes.put('/putUserRoutineDate', putUserRoutineDate);
routinesRoutes.get('/getRoutineById', getRoutineById);



export default routinesRoutes