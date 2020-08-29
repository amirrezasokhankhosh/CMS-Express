const knex = require('./knex'); //the connection

module.exports = {

    // FUNCTIONS FOR USERS 
    getOneUserByEmail(email){
        return knex('user').where('email' , email).first();
    },

    getOneUserById(userId){
        return knex('user').where('userId' , userId).first();
    },

    createUser(user){
        return knex('user').insert(user);
    },

    getAllUsers(){
        return knex('user');
    },

    //FUNCTIONS FOR CATEGORIES
    createCategories(categories){
        return knex('categories').insert(categories);
    },

    getAllCategories(){
        return knex('categories');
    },

    updateCategories(id , categories){
        return knex('categories').where('categoriesId' , id).update(categories);
    },

    getOneCategory(id){
        return knex('categories').where('categoriesId' , id).first();
    },

    deleteOneCategory(id){
        return knex('categories').where('categoriesId' , id).del();
    },


    //FUNCTIONS FOR POSTS
    getAllPosts(){
        return knex('post');
    },

    createPost(post){
        return knex('post').insert(post);
    },

    getOnePost(postId){
        return knex('post').where('postId' , postId).first();
    },

    updatePost(postId , post){
        return knex('post').where('postId' , postId).update(post);
    },

    deleteOnePost(postId){
        return knex('post').where('postId' , postId).del();
    },

    //FUNCTIONS FOR COMMENTS
    getAllComments(postId){
        return knex('comment').where('postId' , postId);
    },

    createComment(comment){
        return knex('comment').insert(comment);
    },

    updateComment(commentId , comment){
        return knex('comment').where('commentId' , commentId).update(comment);
    },

    deleteOneComment(commentId){
        return knex('comment').where('commentId' , commentId).del();
    },

    getOneComment(commentId){
        return knex('comment').where('commentId' , commentId).first();
    },

    deleteAllComments(postId){
        return knex('comment').where('postId' , postId).del()
    }




};