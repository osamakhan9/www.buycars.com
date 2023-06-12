const carModel = require("../model/Product.model");

const Oem_model = require("../model/oem.model");

const getAllCars = async(req , res)=>{
    const {price , color , mileage , } = req.query;
     try {
        let cars = await carModel.find().populate('userID');
        if(price){
           cars = await carModel.find({ price : {$lte : price}}).populate('userID')
           if(color){
               cars = await carModel.find({ price : {$lte : price} , Original_Paint: { $regex: new RegExp(`${color}`), $options: "i" }}).populate('userID')
               if(mileage){
                   cars = await carModel.find({ price : {$lte : price} , Original_Paint: { $regex: new RegExp(`${color}`), $options: "i" } , mileage : {$gte : mileage}}).populate('userID')
               }
           }
           if(mileage){
            cars = await carModel.find({ price : {$lte : price} , mileage : {$gte : mileage}}).populate('userID')
           }
        }
        else if(color){
            cars = await carModel.find({  Original_Paint: { $regex: new RegExp(`${color}`), $options: "i" }}).populate('userID');
            if(mileage){
            cars = await carModel.find({ Original_Paint: { $regex: new RegExp(`${color}`), $options: "i" } , mileage : {$gte : mileage}}).populate('userID')
            }
        }
        else if(mileage){
            cars = await carModel.find({  mileage : {$gte : mileage}}).populate('userID')
    
        }
    
        res.send({
            status:true , 
            cars
        })
     } catch (error) {
        res.status(404).json({
            message: error.message,
            status: false,
          });
     }

}


const getSingleCar = async (req , res)=>{
    const {id} = req.params

    try {
        const car = await carModel.find({ _id : id}).populate('userID');
        let OemData=await Oem_model.find({$or:[{car_manufacturers:car[0].car_Manufacturer},{name_of_model:car[0].model}]})
        res.send({
            cars : car[0] ,
            oem: OemData[0],
            status : true
        })

    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: false,
          });
    }
}



const getAllCarsDealer = async(req , res)=>{
    const userID = req.params.id
    const {price , color , mileage} = req.query;
     try {
        let cars = await carModel.find({ userID : userID }).populate('userID');
        if(price){
           cars = await carModel.find({ userID : userID , price : {$lte : price}}).populate('userID')
           if(color){
               cars = await carModel.find({ userID : userID , price : {$lte : price} , Original_Paint: { $regex: new RegExp(`${color}`), $options: "i" }}).populate('userID')
               if(mileage){
                   cars = await carModel.find({ userID : userID , price : {$lte : price} , Original_Paint: { $regex: new RegExp(`${color}`), $options: "i" } , mileage : {$gte : mileage}}).populate('userID')
               }
           }
           if(mileage){
            cars = await carModel.find({ userID : userID , price : {$lte : price} , mileage : {$gte : mileage}}).populate('userID')
           }
        }
        else if(color){
            cars = await carModel.find({ userID : userID ,  Original_Paint: { $regex: new RegExp(`${color}`), $options: "i" }}).populate('userID');
            if(mileage){
            cars = await carModel.find({ userID : userID , Original_Paint: { $regex: new RegExp(`${color}`), $options: "i" } , mileage : {$gte : mileage}}).populate('userID')
    
            }
        }
        else if(mileage){
            cars = await carModel.find({ userID : userID ,  mileage : {$gte : mileage}}).populate('userID')
    
        }
    
        res.send({
            status:true , 
            cars
        })
     } catch (error) {
        res.status(404).json({
            message: error.message,
            status: false,
          });
     }

}



module.exports = { getSingleCar , getAllCars , getAllCarsDealer}