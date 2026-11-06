require("dotenv").config()
const express=require("express")
const app=express()
const port=8080
require("./db")
const userRouter = require("./routes/user")

app.use(express.json())
app.use('/user', userRouter)

app.listen(port,()=>{
    console.log("http://localhost:"+port)
})