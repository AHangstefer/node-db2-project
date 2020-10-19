const express = require('express');
const db = require("./data/config")

const router = express.Router()

router.get("/", async (req, res, next)=> {
    try {
        const cars = await db.select("*")
            .from("cars")
            res.json(cars)
    }
    catch(err){
        next(err)
    }
})

router.get ("/:id", async (req, res, next) => {
    try {
        const cars = await db 
            .select("*")
            .from("cars")
            .where("id", req.params.id)
            .limit(1)

        res.json(cars)
    }
    catch(err){
        next(err)
    }


})


router.post("/", async (req, res, next)=> {
    try {

        const newCar = {

            VIN: req.body.VIN,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage
         }

        switch(newCar){
            case (!newCar.VIN):
                return res.status(400).json({
                    message: "VIN is required"
                })
                
            
            case (!newCar.make):
                return res.status(400).json({
                    message: "Make is required"
                })
                
            case (!newCar.model):
                 return res.status(400).json({
                    message: "Model is required"
                 })
                
            case (!newCar.mileage):
                 return res.status(400).json({
                     message: "Mileage is required"
                })
                
                default:

                const [id] =await db
                    .insert(newCar)
                    .into("cars")
                
                const car = await db
                    .select("*") 
                    .from("cars")
                    .where("id", id)  
                    
                res.status(201).json(car)


            }


        }
        catch(err){
            next(err)
        }
        
 })


module.exports = router;