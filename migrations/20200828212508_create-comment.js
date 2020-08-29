
exports.up = function(knex) {
    return knex.schema.createTable('comment' , (table) =>{
        table.increments('commentId');
        table.integer('postId').unsigned().notNullable();
        table.foreign('postId').references('postId').inTable('post');
        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('userId').inTable('user');
        table.text('content');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('comment');
};