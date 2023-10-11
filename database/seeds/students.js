/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('students').del()
  const studentsData = [];
  
  for (let i = 1; i <= 100; i++) {
    studentsData.push({ email: `student${i}@gmail.com` });
  }
  for (const student of studentsData) {
    await knex('students').insert(student);
  }
};
