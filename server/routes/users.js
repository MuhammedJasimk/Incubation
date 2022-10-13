const router = require('express').Router();
const { User, validate } = require('../models/user');
const {register} = require('../models/company_register');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const multer = require("multer")
const Joi = require("joi");


router.post("/signup", async (req, res) => {
    console.log('helo google');
   
    try {
        const { error } = validate(req.body)
        if (error) {
            console.log("hello siri");
            console.log(error);
            return res.status(400).send({ message: error.details[0].message });
        }
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(409).send({ message: "Given Email already exist" })
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            date:Date.now()
        }).save()
        res.status(201).send({ message: "user created successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  const upload = multer({ storage: storage })


router.post('/register',upload.single("company_logo"),async (req,res)=>{
    try {
        console.log(req.body);
        console.log(req.file);
        req.body.filename=req.file.originalname
        console.log("after");
        console.log(req.body);
        await new register({
            Name:req.body.Name,  
            address:req.body.address,
            city:req.body.city,
            state:req.body.state,
            email:req.body.email,
            phone:req.body.phone,
            company_name:req.body.company_name,
            company_logo:req.body.filename,
            background:req.body.background,
            product:req.body.product,
            problem:req.body.problem,
            unique:req.body.unique,
            proposition:req.body.proposition,
            Advantage:req.body.Advantage,
            revanue:req.body.revanue,
            Incubation:req.body.Incubation,
            Proposal:req.body.Proposal
        }).save()
        res.status(200).send("success")
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
        
    }
})



module.exports = router;