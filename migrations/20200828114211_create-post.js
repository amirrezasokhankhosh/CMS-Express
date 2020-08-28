
exports.up = function(knex) {
    return knex.schema.createTable('post' , (table) =>{
        table.increments('postId');
        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('id').inTable('user');
        table.integer('categoriesId').unsigned().notNullable();
        table.foreign('categoriesId').references('id').inTable('categories');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('post');
};
