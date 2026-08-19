const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "scpms_db"
});

async function getAllRequisitions() {
    const result = await pool.query(
        "SELECT id, material, quantity, status FROM requisitions ORDER BY id"
    );

    return result.rows;
}

module.exports = {
    getAllRequisitions
};