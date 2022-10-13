const mongoose = require ('mongoose')
const jwt = require ('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
// const { required } = require('joi')

const userSchema = new mongoose.Schema({
    // firstName:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})
 
// userSchema.methods.generateAuthToken = function () {
//     const token =jwt.sign({_id:this._id},process.env.JWTPRIVETKEY,{expiresIn:"7d"})
//     return token
// }

const User = mongoose.model("user",userSchema)
const validate = async (data)=>{
    const schema =Joi.object({
        name:Joi.string().required().label("name"),
        // lastName:Joi.string().required().label("lastName"),
        email:Joi.string().required().label('email'),
        password:passwordComplexity().required().label("password")
    })
    // .required().label("email"),
    return schema.validate(data)
};
module.exports ={User,validate}