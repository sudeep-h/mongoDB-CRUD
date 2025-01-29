const express=require('express');
const app=express();
const mongoose=require('mongoose');

app.use(express.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost/CRUDops').then(()=>{
    console.log('MongoDB connected')
}).catch((err)=>{
    console.log(err);
})

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    job:{
        type:String,
        required:true
    },
    
},{timestamps:true});

const User=mongoose.model('users',userSchema);

app.get('/',(req,res)=>{
    return res.send("Hello from Project 3");
})

//Create users
app.post('/api/users',async (req,res)=>{
    const body=req.body;
    if(!body.firstName || !body.lastName || !body.email || !body.job){
        return res.status(400).json({message:"Bad request"});
    }
    const user=await User.findOne({email:body.email});
    if(user){
        return res.status(400).json({message:"User already exists",user});
    }
    const newUser =await User.create({
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        job:body.job
    })
    return res.status(201).json({message:"Success",newUser});
})

//Show/Read users

//Update user

//Delete user

const PORT=8000
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})