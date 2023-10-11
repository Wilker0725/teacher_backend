/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('teachers').del()
  const teachersData = [];
  
  for (let i = 1; i <= 100; i++) {
    teachersData.push({ email: `teacher${i}@gmail.com` });
  }
  for (const teacher of teachersData) {
    await knex('teachers').insert(teacher);
  }
};
