/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categories', function (table) {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
        table.string('name').notNullable();
        table.string('price');
    })
    .then(() => {
        // Insert sample data into the categories table
        return knex('categories').insert([
          { name: 'Electronics', price: '₦500/kg' },
          { name: 'Plastics', price: '₦500/kg' },
          { name: 'Cans', price: '₦500/kg' },
          { name: 'Nylon', price: '₦500/kg' },
          { name: 'Metal', price: '₦500/kg' },
          { name: 'Car Part', price: '₦500/kg' },
          { name: 'Utensils', price: '₦500/kg' },
          { name: 'Computer Parts', price: '₦500/kg' },
        ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
