const express=require("express");
const router=express.Router()
const db = require('../db')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
router.post('/register',async(req,res)=>{
    const{name,email,password,phone_number}=req.body;
    if(!name || !email || !password || !phone_number){
        return res.status(400).json({error:"Field Is Empty"})
    }
    const user=db.prepare('SELECT * FROM users WHERE email=?').get(email)
    if(!user){
        const hash=await bcrypt.hash(password,10);
        const result=db.prepare('INSERT INTO users (name,email,password,phone_number) VALUES(?,?,?,?)').run(name,email,hash,phone_number)
        res.status(201).json({user_id: result.lastInsertRowid, name, email})
    }
    else{
        return res.status(409).json({error:"Account already exists"})

    }
})

router.post("/login",async(req,res)=>{
    const{email,password}=req.body
    if(!email || !password){
        return res.status(400).json({error:"Empty Email or Password"})
    }
    const checkemail=db.prepare('SELECT * FROM users WHERE email=?').get(email)
    if(!checkemail){
        return res.status(401).json({error:"Email or Password are Wrong"})
    }
    const hash=await bcrypt.compare(password,checkemail.password)
    if(!hash){
        return res.status(401).json({error:"Email or Password are Wrong"})
    }
    else{
        const token=jwt.sign({id:checkemail.user_id, role: checkemail.role},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.json({token})
    }
})

module.exports = router
