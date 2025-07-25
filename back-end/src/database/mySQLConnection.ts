import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

async function iniDatabase() {
    const TConnection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password
    });

    try {
        await TConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
        await TConnection.query(`USE \`${dbConfig.database}\``);

        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS films (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                releaseDate DATE,
                filmGenres VARCHAR(255),
                urlImg VARCHAR(512)
            );
        `;
        await TConnection.execute(createTableSQL);
    } catch (error: any) {
        console.error('Erro ao inicializar o banco de dados:', error.message);
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Verifique as credenciais no arquivo .env.');
        }
        process.exit(1);
    } finally {
        if (TConnection) {
            await TConnection.end();
        }
    }
}

iniDatabase();

const mysqlConnection = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default mysqlConnection;
