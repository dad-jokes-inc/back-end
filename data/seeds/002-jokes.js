
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {content: 'ray\'s joke 1', user_id: 1},
    {content: 'ray\'s joke 2', user_id: 1},
    {content: 'foo\'s joke 1', user_id: 2},
    {content: 'foo\'s joke 2', user_id: 2},
    {content: 'sam\'s joke 1', user_id: 3},
    {content: 'sam\'s joke 2', user_id: 3}
  ])
};
