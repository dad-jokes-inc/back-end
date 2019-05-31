
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {joke: 'ray\'s joke 1', user_id: 1},
    {joke: 'ray\'s joke 2', user_id: 1},
    {joke: 'foo\'s joke 1', user_id: 2},
    {joke: 'foo\'s joke 2', user_id: 2},
    {joke: 'sam\'s joke 1', user_id: 3},
    {joke: 'sam\'s joke 2', user_id: 3}
  ])
};
