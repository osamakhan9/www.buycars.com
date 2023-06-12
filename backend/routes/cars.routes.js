const express = require("express");
const { createCarPost, deletedCar, delMulCar, editCar } = require("../controller/Products.controller");
const { getSingleCar, getAllCars, getAllCarsDealer } = require("../controller/getDataCar");
const carRoute = express.Router();


carRoute.get('/', getAllCars)



carRoute.get('/:id' , getAllCarsDealer)



carRoute.get('/single/:id', getSingleCar)


carRoute.post('/create' , createCarPost)



carRoute.delete('/manydel/:id' , delMulCar)



carRoute.delete('/del/:id' , deletedCar)



carRoute.put('/edit/:id' , editCar)


module.exports = carRoute;