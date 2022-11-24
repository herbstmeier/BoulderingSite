import { createConnection } from 'mariadb/callback';
import { HOST, USER, PASSWORD } from "../config/db.config.js";

// Create a new connection
const connection = await createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

export default connection;