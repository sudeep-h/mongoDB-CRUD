const express=require('express');
const app=express();
const mongoose=require('mongoose');
const ObjectId=require('mongodb').ObjectId;

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
app.get('/api/users',async (req,res)=>{
    const users=await User.find({});
    return res.status(200).send(users);
    
})

//Show user with id
app.get('/api/users/:id',async(req,res)=>{
    const id=req.params.id;
    const u_id=new ObjectId(id);
    let user=await User.findOne({_id:u_id});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }else{
        return res.send(user);
    }

})

//Update user
app.put('/api/users/:id', async(req,res)=>{
    const user=await User.findById(req.params.id);
    console.log("user---",user)
    if(!user){
        return res.status(400).json({message:"User does not exist"});
    }
    const newUser=await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"});
    return res.status(200).json({message:"Updated successfully",newUser});
})

//Delete user
app.delete('/api/users/:id',async(req,res)=>{
    let user=await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    await User.findByIdAndDelete(req.params.id);
    return res.status(201).json({message:"Deleted successfully"});
})

const PORT=8000
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})