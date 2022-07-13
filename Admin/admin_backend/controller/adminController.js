const admin =  require('../models/adminModel')

//  /**Login */
const AdminLogin =async (req,res)=>{
    // let client1 = new clientRegistration (req.body);
     const {email,password} =req.body;
     admin.findOne({email:email},(err,user)=>{
         if(user){
             if(password === user.password && email === user.email){
                
                 return res.status(200).json({message:"Login successful!",data:user})
             }else{
                 return res.status(400).json({error:"Invalid email or password!"})
             }
          }else{
             return res.status(400).json({error:"Not registered!"})
          }
         })
         
 }

 module.exports = AdminLogin