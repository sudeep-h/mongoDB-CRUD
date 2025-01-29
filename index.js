const express=require('express');
const app=express();
require("dotenv").config();
const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    return res.send("Hello from Project 3");
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})