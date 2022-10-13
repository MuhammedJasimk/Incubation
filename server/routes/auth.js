const router = require("express").Router();
const {User} = require ('../models/user');
const {Admin} = require ('../models/admin');
const jwt = require ('jsonwebtoken')
// const Joi =require('joi')
const passwordComplexity = require('joi-password-complexity');

const bcrypt = require('bcrypt')


router.post('/login',async (req,res)=>{  
    console.log("sdfghjkl");
     try {
         const user = await User.findOne({email:req.body.email})
         if (!user)
         return res.status(401).send({message:'Invalid Email or Password'})
         const hashPswrd =await bcrypt.compare(
             req.body.password,user.password
         )

         if(hashPswrd){
             const token = jwt.sign({
                 name:user.name,
                 email:user.email
             },process.env.JWTPRIVETKEY )
             console.log("success");
            //  return res.status(200).send({user:token,message:"Log in successfully"})
                res.status(200).json({token})
            }else{
             console.log("fail");
             return res.json({user:false,message:"Log in faild"}) 
         }
         
     } catch (error) {
         console.log(error);
         res.status(500).send({message:"internal servr Err"})
         
     }
 })

 router.post('/adminLogin',async (req,res)=>{  
     try {
        console.log(req.body);
        console.log("sdfghjk");
        const admin = await Admin.findOne({email:req.body.email})
        if (!admin)
        return res.status(401).send({message:'Invalid Email or Password'})
        const hashPswrd =await bcrypt.compare(
            req.body.password,admin.password
        )

        if(hashPswrd){
            const Admintoken = jwt.sign({
                name:admin.name,
                email:admin.email
            },process.env.JWTPRIVETKEY )
            console.log("success");
           //  return res.status(200).send({user:token,message:"Log in successfully"})
               res.status(200).json({Admintoken})
           }else{
            console.log("fail");
            return res.json({admin:false,message:"Log in faild"}) 
        }
        
    } catch (error) {
        console.log("errrrr");
        console.log(error);
        res.status(500).send({message:"internal servr Err"})
        
    }
})


//  router.post('/save',(req,res)=>{
//             console.log("postman");
//             console.log(req.body);
//             new Admin({
               
//                 email: req.body.email,
//                 password: req.body.password,
                
//             }).save()
//             res.status(200).send("success")
//         })

    



module.exports = router