const router = require("express").Router();
const { response } = require("express");
const {register} = require ('../models/company_register')
const {slot} = require ('../models/slot_model')

router.get('/getRegistration',async(req,res)=>{
    try {
        console.log("server");
        let data =await register.find({status:"Pending"})
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log("err");
    }
})

router.get('/applicationList',async(req,res)=>{
    try {
        console.log("server");
        let data =await register.find({status:"Approved"})
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log("err");
    }
})

router.get('/decline_list',async(req,res)=>{
    try {
        console.log("server");
        let data =await register.find({status:"Decline"})
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log("err");
    }
})

router.get('/getSlot',async(req,res)=>{
    console.log("cvbnm,");
    try {
        console.log("slot");
        let data =await slot.find()
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        console.log("err");
    }
})

router.post('/getDetail',async(req,res)=>{
try {
    let data = await register.findOne({_id:req.body.id})
    res.status(200).json(data)
} catch (error) {
   console.log(error); 
}
})

router.post('/approved',async(req,res)=>{
    try {
        let data = await register.findByIdAndUpdate({_id:req.body.id},{status:"Approved"})
        res.status(200).json(data)
    } catch (error) {
       console.log(error); 
    }
    })


    router.post('/decline',async(req,res)=>{
        try {
            let data = await register.findByIdAndUpdate({_id:req.body.id},{status:"Decline"})
            res.status(200).json(data)
        } catch (error) {
           console.log(error); 
        }
        })

    router.get('/slotUpdate',async(req,res)=>{
        console.log("req.query.slotId");
        console.log(req.query.slotId);
        console.log(req.query.company);
        let update = await register.findOneAndUpdate({company_name:req.query.company},{status:"Booked"})
        if(update){
        let data =await slot.findByIdAndUpdate({_id:req.query.slotId},{
            isBooked:true,
            company:req.query.company
        })
        res.status(200).json(data)
    }else{
        console.log("Error");
    }
        })

    router.get('/progerss',async(req,res)=>{
        let data =  await register.find()
        res.status(200).json(data)
    })



        router.post('/save',(req,res)=>{
            console.log("postman");
            console.log(req.body);
            new slot({
                slot:req.body.slot,
                isBooked:req.body.isBooked,
                company:req.body.company,
                userId:req.body.userId,
            }).save()
            res.status(200).send("success")
        })


       

module.exports = router