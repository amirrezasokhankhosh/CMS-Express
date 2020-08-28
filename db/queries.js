const knex = require('./knex'); //the connection

module.exports = {

    // FUNCTIONS FOR USERS 
    getOneUser(email){
        return knex('user').where('email' , email).first();
    },

    createUser(user){
        return knex('user').insert(user);
    },

    //FUNCTIONS FOR CATEGORIES
    createCategories(categories){
        return knex('categories').insert(categories);
    },

    getAllCategories(){
        return knex('categories');
    },

};