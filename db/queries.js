const knex = require('./knex'); //the connection

module.exports = {
    getOneUser(email){
        return knex('user').where('email' , email).first();
    },

    createUser(user){
        return knex('user').insert(user);
    }
};