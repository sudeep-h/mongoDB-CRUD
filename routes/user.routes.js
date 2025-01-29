const express=require('express');
const router=express.Router();
const {handleCreateUsers,handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserById} = require('../controllers/user.controller');

router.post('/',handleCreateUsers)
router.get('/',handleGetAllUsers)
router.get('/:id',handleGetUserById)
router.put('/:id', handleUpdateUserById)
router.delete('/:id',handleDeleteUserById)

module.exports=router;