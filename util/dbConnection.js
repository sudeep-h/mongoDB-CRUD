const mongoose=require('mongoose');

async function connectDb(url){
    await mongoose.connect('mongodb://localhost/CRUDops').then(()=>{
        console.log('MongoDB connected')
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports=connectDb;