
exports.up = function(knex) {
    return knex.schema.createTable('categories' , (table) =>{
        table.increments('categoriesId');
        table.text("category_1");
        table.text("category_2");
        table.text("category_3");
        table.text("category_4");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('categories');
};
