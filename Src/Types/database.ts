import mysql, { Pool } from 'mysql2/promise';

class Database {
    private pool: Pool;

    constructor(host: string, user: string, password: string, database: string) {
        this.pool = mysql.createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            waitForConnections: true,
            connectionLimit: 0,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });
    }

    public async getConnection(): Promise<Pool> {
        return this.pool;
    }

    public async execute(sql: string, values?: any[]): Promise<any> {
        const connection = await this.pool.getConnection();
        
        try {
            const [ rows ] = await connection.query(sql, values);
            return rows;
        } catch (error) {
            throw(error);
        } finally {
            connection.release();
        }
    }

    public async executeQuery(sql: string, values?: any[]): Promise<any> {
        const connection = await this.pool.getConnection();

        try {
            const [ rows ] = await connection.query(sql, values);
            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }

    }
}

export default Database;
