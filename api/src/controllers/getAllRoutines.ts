const {Routine} = require('../db_connection');
import {Request, Response} from 'express';

const getAllRoutines=async(_req:Request, res:Response)=>{
    try {
        const allRoutines= await Routine.findAll()
        if(allRoutines){
            res.status(200).json(allRoutines)
        }}
    catch (error:any) {
        res.status(500).json({error:error.message})
    
    }
}

module.exports = getAllRoutines;