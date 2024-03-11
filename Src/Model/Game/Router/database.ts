import mysql, { Pool } from "mysql2/promise";
import { Field } from "../Utils/field";
import { Board } from "../Utils/board";

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
			throw error;
		} finally {
			connection.release();
		}
	}

	public async saveBoard(board: Board): Promise<Boolean> {
		const connection = await this.pool.getConnection();
		try {
			board.fields.forEach((row) => {
                row.forEach(async (field) => {
				const [ rows ] = await connection.query('I_FieldState(?, ?, ?, ?, ?)', [ board.userId, board.gameId, field.x, field.y, field.isOpen ]);
                })
			});
		} catch (error) {
			throw error;
            return false;
		} finally {
			connection.release();
		};

        return true;
	}
}

export { Database };
