exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('user_username', 200).notNullable()
      users.string('user_password', 200).notNullable()
      users.string('user_email', 320).notNullable()
      users.timestamps(false, true)
    })
    .createTable('guests', (guests) => {
      guests.increments('guest_id')
      guests.string('guest_name', 200).notNullable()
    })
    .createTable('potluck', (potluck) => {
      potluck.increments('potluck_id')
      potluck.string('potluck_name', 200).notNullable()
      potluck.date('potluck_date').notNullable()
      potluck.time('potluck_time').notNullable()
      potluck.string('potluck_location', 200).notNullable()
      potluck.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
    .createTable('dish', (dish) => {
      dish.increments('dish_id')
      dish.string('dish_name', 200).notNullable()
      dish.integer('potluck_id')
        .unsigned()
        .notNullable()
        .references('potluck_id')
        .inTable('potluck')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      dish.integer('user_id')
        .unsigned()
        .references('user_id')
        .inTable('users')  
    })
};

exports.down = async (knex) => {
  return await knex.schema
  .dropTableIfExists('dish')
  .dropTableIfExists('potluck')
  .dropTableIfExists('guests')
  .dropTableIfExists('users')
};