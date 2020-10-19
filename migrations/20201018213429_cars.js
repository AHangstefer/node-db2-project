
exports.up = async function(knex) {

  await knex.schema.createTable("cars", (table) => {
    table.increments("id")
    table.blob("VIN").notNull().unique()
    table.blob("make").notNull()
    table.blob("model").notNull()
    table.float("mileage").notNull()
    table.text("title")
    table.text("transmission")
    table.text("color")

  })

};

exports.down = async function(knex) {
  
};
