/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('transactions', function (table) {
        table.string('weight').notNullable();
        table.string('image_url').notNullable();
        table.string('pick_up_address').notNullable();
        table.string('pick_up_date').notNullable();
        table.string('pick_up_time').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.down = function(knex) {
    return knex.schema.table('transactions', function (table) {
        table.dropColumn('weight');
        table.dropColumn('image_url');
        table.dropColumn('pick_up_address');
        table.dropColumn('pick_up_date');
        table.dropColumn('pick_up_time');       
    });
};
