const { Pool } = require('pg');
const dotEnv = require('dotenv');
dotEnv.config();

const PG_URI = process.env.PG_URI;

// create a new pool here using the connection string above
const pool = new Pool(
  {
    connectionString: PG_URI,
  },
  (e) => {
    if (e) console.log(e);
    else {
      console.log('Connected to Postgres DB');
    }
  },
);

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
