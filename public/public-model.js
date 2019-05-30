const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findByUser
}

function find(){
    return db('public')
}

function findById(id){
    return db('public')
        .where({id})
        .first()
}

async function add(joke) {
    const [id] = await db('public').insert(joke);
    
    return findById(id);
  }

function update(id, changes){
    console.log(changes);
    return db('public')
        .where({id})
        .update(changes)        
}

function remove(id){
    return db('public')
        .where({id})
        .del()
}

function findByUser(user_id){
    return db('public')
    .where({ user_id })
}