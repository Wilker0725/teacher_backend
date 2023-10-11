/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    return knex.schema.createTable('teachers', table => {
        table.increments('id').primary();
        table.string('email').unique().notNullable();
        table.timestamps(true, true); 
    }).createTable('students', table => {
        table.increments('id').primary();
        table.string('email').unique().notNullable();
        table.timestamps(true, true); 
    }).createTable('teacher_student', (table) => {
        table.integer('teacher_id').unsigned().references('id').inTable('teachers');
        table.integer('student_id').unsigned().references('id').inTable('students');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    return knex.schema.dropTable('teachers')
        .dropTable("students")
        .dropTable("teacher_student");
};

