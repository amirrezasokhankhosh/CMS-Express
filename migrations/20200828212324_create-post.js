
exports.up = function(knex) {
    return knex.schema.createTable('post' , (table) =>{
        table.increments('postId');
        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('userId').inTable('user');
        table.integer('categoriesId').unsigned().notNullable();
        table.foreign('categoriesId').references('categoriesId').inTable('categories');
        table.text('content');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('post');
};


