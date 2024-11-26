
import {pool} from "../config/dbConfig";

export const createTable = async () => {
    try {
        const createTodoTable = `
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'fulfilled', 'not done')),
                dueDate VARCHAR(30),
                priority VARCHAR(50) DEFAULT 'low' CHECK (priority IN ('low', 'mid', 'high'))
            );
        `;

        await pool.query(createTodoTable);
    } catch (error) {
        console.log('error in creating the table', error);
    }
}