
exports.up = function(knex) {
    return knex.schema.createTable('categories' , (table) =>{
        table.increments('categoriesId');
        table.text("categorie_1");
        table.text("categorie_2");
        table.text("categorie_3");
        table.text("categorie_4");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('categories');
};
