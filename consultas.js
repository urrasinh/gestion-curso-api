const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1313',
    database: 'cursos',
    port: 5432,
})