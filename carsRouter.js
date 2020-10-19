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

            if (!newCar.VIN || !newCar.model){
                return res.status(400).json({
                    message: "field is required"
                })
            }
                
            if (!newCar.make || !newCar.mileage){
                return res.status(400).json({
                    message: "field is required"
                })
            }
            
            else {
           
                const [id] = await db
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


router.put("/:id", async (req, res, next)=>{
    try{

        const changeToMake = {
            VIN: req.body.VIN,
            mileage: req.body.mileage
        }

        if(!changeToMake.VIN || !changeToMake.mileage){
            return res.status(404).json({
                message: "Fields required"
            })
        }

        await db("cars")
            .where("id", req.params.id)
            .update(changeToMake)

        const changedCar = await db
            .select("*")
            .from("cars")
            .where("id", req.params.id)

        res.json(changedCar)
    }
    catch (err){
        next(err)
    }

})