
exports.seed = async function(knex) {

  await knex("cars").truncate()

  await knex("cars").insert([
    {VIN: 2134, make: "Ford", model: "F150", mileage: 10000 , title: "clean", color: "red"},
    {VIN: 1111, make: "BMW"  , model: "335I" , mileage: 500 , title: "salvage", transmission: "manule", color: "black"},
    {VIN: 0299, make: "Suzuki"  , model: "Swift" , mileage: 250 , transmission: "auto", color: "yellow"},
    {VIN: 3452, make: "Nissan" , model: "Micra" , mileage: 10, title: "clean", transmission: "manule", color: "silver"},
    {VIN: 2567, make: "Audi" , model: "S3" , mileage: 3013 , title: "salvage", transmission: "auto"},
  ])
 
};