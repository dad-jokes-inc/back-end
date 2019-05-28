
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', tbl => { 
      tbl.increments();
      tbl
      .string('username', 128)
      .notNullable()
      .unique()

      tbl
      .string('password', 256)
      .notNullable()
  }) // this is the end of users table
  .createTable('jokes', tbl => {
    tbl.increments();
    tbl
    .string('jokes', 500)
    .notNullable();
    tbl
    .integer('user_id')
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('jokes')
};
