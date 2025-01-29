const User=require('../models/user.model');

async function handleCreateUsers(req,res){
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
}

async function handleGetAllUsers(req,res){
    const users=await User.find({});
    return res.status(200).send(users);
}

async function handleGetUserById(req,res){
    let user=await User.findById(req.params.id);
    if(!user){
        return res.status(400).json({message:"User not found"});
    }else{
        return res.send(user);
    }
}

async function handleUpdateUserById(req,res){
    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(400).json({message:"User does not exist"});
    }
    const newUser=await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"});
    return res.status(200).json({message:"Updated successfully",newUser});
}


async function handleDeleteUserById(req,res){
    let user=await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    await User.findByIdAndDelete(req.params.id);
    return res.status(201).json({message:"Deleted successfully"});
}

module.exports={
    handleCreateUsers,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById
}