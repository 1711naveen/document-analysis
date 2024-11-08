import mysql from 'mysql2/promise'

const db = mysql.createPool({
  host: '127.0.0.1', // Replace with your database host
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'document_edit_tool', // Replace with your database name
});

export default db;