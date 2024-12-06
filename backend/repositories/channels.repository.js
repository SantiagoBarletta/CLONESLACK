import pool from "../config/dbconfig.js";

class ChannelsRepository {
    /**
     * Crea un nuevo canal
     * @param {Object} channel_data - Datos del canal a almacenar
     * @returns {Promise<Object>} - Promesa que resuelve al canal creado
     */
    static async createChannel(channel_data) {
        const { name, workspace_id } = channel_data;

        const query = `
            INSERT INTO channels (name, workspace_id, activo)
            VALUES (?, ?, 1)
        `;

        try {
            const [result] = await pool.execute(query, [name, workspace_id]);

            if (result.affectedRows > 0) {
                return {
                    id: result.insertId,
                    name,
                    workspace_id,
                };
            } else {
                throw new Error("No se pudo crear el canal");
            }
        } catch (error) {
            console.error("Error al crear canal:", error);
            throw error;
        }
    }
}

export default ChannelsRepository;
