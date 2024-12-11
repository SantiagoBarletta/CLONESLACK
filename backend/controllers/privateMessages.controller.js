import pool from "../config/dbconfig.js";

// Obtener mensajes privados entre dos usuarios
import jwt from "jsonwebtoken";
import ENVIROMENT from "../config/enviroment.js";

export const getPrivateMessages = async (req, res) => {
    const { userID } = req.params;

    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Usuario no autenticado" });
        }

        const decoded = jwt.decode(token);
        const authenticatedUserId = decoded.user_id;

        const [messages] = await pool.query(
            `SELECT pm.id, pm.sender_id, pm.receiver_id, pm.text, 
                    DATE_FORMAT(pm.date, '%Y-%m-%dT%H:%i:%sZ') AS date,
                    u.username AS sender_name, u.foto_perfil AS sender_image
             FROM private_messages pm
             JOIN users u ON pm.sender_id = u.id
             WHERE ((pm.sender_id = ? AND pm.receiver_id = ?) OR (pm.sender_id = ? AND pm.receiver_id = ?))
             AND pm.activo = 1
             ORDER BY pm.date ASC`,
            [authenticatedUserId, userID, userID, authenticatedUserId]
        );
        

        console.log("Mensajes obtenidos:", messages); // Confirmamos que ahora sea un array plano
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error("Error al obtener mensajes privados:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};





// Enviar un mensaje privado
export const sendPrivateMessage = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { receiver_id, text } = req.body;

    if (!token || !receiver_id || !text) {
        return res.status(400).json({ success: false, message: "Datos incompletos" });
    }

    try {
        const decoded = jwt.decode(token);
        const sender_id = decoded.user_id;

        const [result] = await pool.query(
            `INSERT INTO private_messages (sender_id, receiver_id, text, date, activo)
             VALUES (?, ?, ?, NOW(), 1)`,
            [sender_id, receiver_id, text]
        );

        // Obtener el mensaje recién insertado con todas sus propiedades
        const [newMessage] = await pool.query(
            `SELECT id, sender_id, receiver_id, text, 
                    DATE_FORMAT(date, '%Y-%m-%dT%H:%i:%sZ') AS date
             FROM private_messages
             WHERE id = ?`,
            [result.insertId]
        );

        res.status(201).json({ success: true, message: newMessage[0] });
    } catch (error) {
        console.error("Error al enviar mensaje privado:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};
