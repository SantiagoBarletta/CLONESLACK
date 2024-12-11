import pool from "../config/dbconfig.js";

// Obtener mensajes privados entre dos usuarios
export const getPrivateMessages = async (req, res) => {
    const { userID } = req.params;
    const authenticatedUserId = req.user.id; // ID del usuario autenticado, probablemente desde el middleware JWT

    try {
        const messages = await pool.query(
            `SELECT id, sender_id, receiver_id, text, 
                    DATE_FORMAT(date, '%Y-%m-%dT%H:%i:%sZ') AS date, 
                    activo 
             FROM private_messages
             WHERE ((sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?))
             AND activo = 1
             ORDER BY date ASC`,
            [authenticatedUserId, userID, userID, authenticatedUserId]
        );
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error("Error al obtener mensajes privados:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

// Enviar un mensaje privado
export const sendPrivateMessage = async (req, res) => {
    const { sender_id, receiver_id, text } = req.body;

    if (!sender_id || !receiver_id || !text) {
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    try {
        await pool.query(
            `INSERT INTO private_messages (sender_id, receiver_id, text, date, activo) VALUES (?, ?, ?, NOW(), 1)`,
            [sender_id, receiver_id, text]
        );
        res.status(201).json({ success: true, message: "Mensaje enviado correctamente" });
    } catch (error) {
        console.error("Error al enviar mensaje privado:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};
