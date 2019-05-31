

exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('jokes', tbl => {
      tbl.increments();
      tbl
      .string('joke', 500)
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
    .dropTableIfExists('jokes')
  };
  
