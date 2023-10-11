import dotenv from "dotenv";

dotenv.config();
// temporary solution to resolve lost env variable during generating seed
dotenv.config({path: "../.env"});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'mysql2',
    connection: {
      host : process.env.MYSQL_HOST,
      port : process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      user:     process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seed: {
      directory: './migrations',
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      host : process.env.MYSQL_HOST_PROD,
      port : process.env.MYSQL_PORT_PROD,
      database: process.env.MYSQL_DATABASE_PROD,
      user:     process.env.MYSQL_USER_PROD,
      password: process.env.MYSQL_PASSWORD_PROD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seed: {
      directory: './migrations',
    }
  },
};
