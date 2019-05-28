
exports.seed = function(knex, Promise) {
      return knex('users').insert([
        {id: 1, username: 'ray', password: '123'},
        {id: 2, username: 'foo', password: 'bar'},
        {id: 3, username: 'sam', password: 'pass'}
      ]);
};
