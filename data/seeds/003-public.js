
exports.seed = function(knex, Promise) {
  return knex('public').insert([
    {publicJoke:'here is a great public one'},
    {publicJoke:'here is a great public two'},
    {publicJoke:'here is a great public three'},
  ])
};
