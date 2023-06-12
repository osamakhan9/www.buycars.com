
const express=require("express")
const Oem_model = require('../model/oem.model')

const OemRouter=express.Router()

OemRouter.post("/postoem",async(req,res)=>{
    const body=req.body

    try {
        
        let post = await Oem_model.create({...body})
        res.send({
            status:true , 
            message : 'OEM Added Successfully'
        })

    } catch (error) {
        res.send({status : false , message : error.message})
    }
  
})

module.exports=OemRouter