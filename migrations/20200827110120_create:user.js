
exports.up = function(knex) {
  return knex.schema.createTable('user' , (table) =>{
    table.increments();
    table.text("firstName");
    table.text("lastName");
    table.text("email");
    table.text("password");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
