const jwt=require('jsonwebtoken');
const path=require('path');

const authMiddleware=(req,res,next)=>{
  const token = req.cookies.token;

  if(!token)return res.redirect('/');
  try{
   const decoded=jwt.verify(token,process.env.JWT_SECRET)
   req.user=decoded;
   next();
}catch(err){
  res.status(401).json({message:"Invalid token"});
}  
}

module.exports=authMiddleware;