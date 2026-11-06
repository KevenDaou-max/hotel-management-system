const express=require("express")
const router=express.Router()
const db = require('../db')

const { requireAuth, requireStaff } = require('../middleware/auth')

router.get('/',(req,res)=>{
    const type_id=req.query.type_id
    
    if(!type_id){
        const roomtypes=db.prepare(`SELECT * FROM room_types`)
        res.status(200).json(roomtypes)
    }
    else if(type_id){
        const roomtype=db.prepare(`SELECT * FROM room_types WHERE type_id=?`).get(type_id)

    }
    


})