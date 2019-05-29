
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
    return db('jokes')
}

function findById(id){
    return db('jokes')
        .where({id})
        .first()
}

async function add(joke) {
    const [id] = await db('jokes').insert(joke);
    return findById(id);
  }

function update(id, changes){
    console.log(changes);
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