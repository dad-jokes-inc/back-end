
const db = require('../data/dbConfig');
const User = require('../users/users-model');

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findByUser
}

function find(){
     return db('jokes as j')
     .join('users as u', 'j.user_id', 'u.id')
     .select('j.id', 'j.user_id', 'j.joke', 'u.username')
    
}

function findById(id){
    return db('jokes')
        .where({id})
        .first()
}

async function add(joke, user_id) {
    const [id] = await db('jokes').insert({...joke, user_id});
    
    return findById(id);
  }

function update(id, changes){
    return db('jokes')
        .where({id})
        .update(changes)        
}

function remove(id){
    return db('jokes')
        .where({id})
        .del()
}

function findByUser(user_id){
    return db('jokes')
    .where({ user_id })
}