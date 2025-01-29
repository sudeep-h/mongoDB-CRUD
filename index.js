const express=require('express');
const app=express();
const connectDb=require('./util/dbConnection');
const userRoutes=require('./routes/user.routes');

app.use(express.urlencoded({extended:false}));

connectDb('mongodb://localhost/CRUDops').then(()=>{
    console.log("mongo connected");
})

app.get('/',(req,res)=>{
    return res.send("Hello from Project 3");
})

app.use('/api/users',userRoutes);

const PORT=8000
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})