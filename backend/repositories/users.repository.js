import pool from "../config/dbconfig.js";

class UsersRepository {
    static async getUserById(userID) {
        const query = `
            SELECT id, firstname, lastname, email, foto_perfil AS profile_image, username, fecha_nacimiento
            FROM users
            WHERE id = ? AND activo = 1
        `;
        try {
            const [rows] = await pool.query(query, [userID]);
            return rows[0] || null;
        } catch (error) {
            console.error("Error en UsersRepository.getUserById:", error);
            throw error;
        }
    }
    
    

    static async updateUser(userID, { firstname, lastname, email, profile_image, fecha_nacimiento }) {
        const query = `
            UPDATE users 
            SET firstname = ?, lastname = ?, email = ?, foto_perfil = ?, fecha_nacimiento = ?
            WHERE id = ? AND activo = 1
        `;
    
        try {
            const [result] = await pool.query(query, [firstname, lastname, email, profile_image, fecha_nacimiento, userID]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error en UsersRepository.updateUser:", error);
            throw error;
        }
    }
    
    
    
}

export default UsersRepository;
