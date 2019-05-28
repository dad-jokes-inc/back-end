
const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find(){
    return db('jokes')
}

function findById(id){
    return db('jokes')
        .where({id})
        .first()
}

function add(track){
    return db('jokes')
        .insert(track, 'id')
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