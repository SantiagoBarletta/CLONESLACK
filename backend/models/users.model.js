import pool from '../config/dbconfig.js';

const UsersModel = {
  
  findByEmail: async (email) => {
    const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return result;
  },

  create: async (user) => {
    const { name, email, password, emailVerified, verificationToken } = user;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, emailVerified, verificationToken) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, emailVerified, verificationToken]
    );
    return result.insertId; 
  },

  
  verifyEmail: async (email) => {
    const [result] = await pool.query(
      'UPDATE users SET emailVerified = 1 WHERE email = ?',
      [email]
    );
    return result.affectedRows; 
  },

  updatePassword: async (email, hashedPassword) => {
    const [result] = await pool.query(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashedPassword, email]
    );
    return result.affectedRows; 
  },
};

export default UsersModel;
