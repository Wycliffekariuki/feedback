require('dotenv').config({ path: '../.env'});
require('pg');
const pool = pg.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnectios: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const query = async (sql, values) => {
    return pool.query(sql, values);
};

module.exports = { pool, query };
