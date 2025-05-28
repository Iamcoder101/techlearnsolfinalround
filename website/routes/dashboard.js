const express=require('express');
const router=express.Router();
const authMiddleware= require('../middleware/authmiddleware');
const path=require('path');

router.get("/dashboard",authMiddleware,(req,res)=>{
    res.sendFile(path.join(__dirname,"..","protected","dashboard.html"));
});
module.exports=router;

