/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('transactions', function (table) {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    table.string('name');
    table.string('price');
    table.string('status');
    table.uuid('user_id').notNullable().references('id').inTable('users')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
