/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
        table.string('full_name');
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('phone_number').unique().notNullable();
        table.string('nin').unique().nullable();
        table.string('bvn').unique().nullable();
        table.string('account_number').unique().nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
