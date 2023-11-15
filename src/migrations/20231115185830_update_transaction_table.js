/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('transactions', function (table) {
        table.uuid('category_id').notNullable().references('id').inTable('categories')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('transactions', function (table) {
        table.dropColumn('category_id');
    });
};
