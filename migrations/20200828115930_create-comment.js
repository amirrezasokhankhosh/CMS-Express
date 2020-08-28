
exports.up = function(knex) {
    return knex.schema.createTable('comment' , (table) =>{
        table.increments('commentId');
        table.integer('postId').unsigned().notNullable();
        table.foreign('postId').references('postId').inTable('post');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('comment');
};
