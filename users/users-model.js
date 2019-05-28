const db = require('../database/dbConfig');

module.exports ={
    add, 
    find,
    findBy,
    findById,
    remove,
    update
}

function find(){
    return db('users').select('id', 'name', 'password')
}

function findBy(filter){
    return db('users').where(filter)
}

function findById(id){
    return db('users').where({id}).first()
}

async function add(user){
    const[id] = await db('users').insert(user);
    return findById(id)
}
function remove(id){
    return db('users').where({id}).del()
}

function update(id, changes){
    return db('users').where({id}).update(changes)
}