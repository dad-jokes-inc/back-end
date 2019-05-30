
exports.up = function(knex, Promise) {
  return knex.schema.createTable('public', tbl => {
        tbl.increments();
        tbl
        .string('publicJoke', 500)
        .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('public')
};
