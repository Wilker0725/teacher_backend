/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    return knex.schema.createTable('suspensions', table => {
        table.increments('id').primary();
        table.integer('student_id').unsigned().notNullable().references('id').inTable('students');
        table.timestamp('suspended_at').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    return knex.schema.dropTable('suspensions');
};
