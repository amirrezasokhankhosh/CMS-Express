
exports.up = function(knex) {
  return knex.schema.createTable('user' , (table) =>{
    table.increments('userId');
    table.text("firstName");
    table.text("lastName");
    table.text("email");
    table.text("password");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
