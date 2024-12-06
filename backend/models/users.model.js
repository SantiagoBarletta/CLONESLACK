import pool from '../config/dbconfig.js';

const UsersModel = {
  // Buscar usuario por email o username
  findByEmailOrUsername: async (login) => {
    const [result] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [login, login]
    );
    return result;
  },

  // Crear un nuevo usuario
  create: async (user) => {
    const { firstname, lastname, username, email, password, emailVerified, verificationToken } = user;
  
    // Ruta de la imagen de perfil por defecto
    const defaultProfileImage = "/Imagenes/user.png";
  
    const [result] = await pool.query(
      `INSERT INTO users (firstname, lastname, username, email, password, emailVerified, verificationToken, foto_perfil) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstname, lastname, username, email, password, emailVerified, verificationToken, defaultProfileImage]
    );
    return result.insertId;
  },
  

  // Verificar el email de un usuario
  verifyEmail: async (email) => {
    const [result] = await pool.query(
      'UPDATE users SET emailVerified = 1 WHERE email = ?',
      [email]
    );
    return result.affectedRows;
  },

  // Actualizar la contraseña de un usuario
  updatePassword: async (email, hashedPassword) => {
    const [result] = await pool.query(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashedPassword, email]
    );
    return result.affectedRows;
  },
};

export default UsersModel;
