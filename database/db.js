import dotenv from "dotenv";
import knex from "knex";
import knexfile from "./knexfile.js";

dotenv.config();

const env = process.env.NODE_ENV || 'development'; 
// temporary solution to resolve lost env variable during run jest
const db = knex(knexfile['development']);

export default db;
