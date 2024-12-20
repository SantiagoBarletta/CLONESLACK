import pool from "../config/dbconfig.js";

class WorkspacesRepository {
    /**
     * Obtiene todos los workspaces activos con sus canales y usuarios asociados
     * @returns {Promise<Array<Object>>}
     */
    static async getAllWorkspaces() {
        try {
            const workspacesQuery = `
        SELECT id, name, image, administrador_id 
        FROM workspaces 
        WHERE activo = 1
      `;
            const [workspaces] = await pool.query(workspacesQuery);

            if (!workspaces.length) return [];

            const channelsQuery = `
        SELECT id, name, workspace_id 
        FROM channels 
        WHERE workspace_id IN (?) AND activo = 1
      `;
            const workspaceIds = workspaces.map((w) => w.id);
            const [channels] = await pool.query(channelsQuery, [workspaceIds]);

            const usersQuery = `
        SELECT u.id, u.username, u.foto_perfil, mw.workspace_id
        FROM users u
        JOIN workspace_members mw ON u.id = mw.user_id
        WHERE mw.workspace_id IN (?) AND mw.activo = 1
      `;
            const [users] = await pool.query(usersQuery, [workspaceIds]);

            return workspaces.map((workspace) => {
                const workspaceChannels = channels.filter(
                    (c) => c.workspace_id === workspace.id
                );
                const workspaceUsers = users.filter(
                    (u) => u.workspace_id === workspace.id
                );
                return {
                    ...workspace,
                    channels: workspaceChannels,
                    users: workspaceUsers,
                };
            });
        } catch (error) {
            console.error("Error en WorkspacesRepository.getAllWorkspaces:", error);
            throw error;
        }
    }

    /**
     * Crea un nuevo workspace y registra al creador como miembro
     * @param {Object} new_workspace_data - Datos del workspace a almacenar
     * @returns {Promise<Object>} - Workspace creado
     */
    static async createWorkspace(new_workspace_data) {
        const { name, description, image, administrador_id } = new_workspace_data;

        const workspaceQuery = `
      INSERT INTO workspaces (name, descripcion, image, administrador_id, activo)
      VALUES (?, ?, ?, ?, 1)
    `;
        const memberQuery = `
      INSERT INTO workspace_members (workspace_id, user_id, activo)
      VALUES (?, ?, 1)
    `;
        const channelQuery = `
      INSERT INTO channels (name, workspace_id, activo)
      VALUES (?, ?, 1)
    `;

        try {
            const [workspaceResult] = await pool.query(workspaceQuery, [
                name,
                description || null,
                image || null,
                administrador_id,
            ]);

            const workspaceId = workspaceResult.insertId;

            await pool.query(memberQuery, [workspaceId, administrador_id]);

            await pool.query(channelQuery, ["General", workspaceId]);

            return {
                id: workspaceId,
                name,
                description,
                image,
                administrador_id,
            };
        } catch (error) {
            console.error("Error en WorkspacesRepository.createWorkspace:", error);
            throw error;
        }
    }

    static async getWorkspaceByIdWithDetails(workspaceID) {
        const workspaceQuery = `
        SELECT w.id, w.name, w.image, c.id AS channel_id, c.name AS channel_name, u.id AS user_id, u.username, u.foto_perfil
        FROM workspaces w
        LEFT JOIN channels c ON w.id = c.workspace_id AND c.activo = 1
        LEFT JOIN workspace_members wm ON w.id = wm.workspace_id
        LEFT JOIN users u ON wm.user_id = u.id AND wm.activo = 1
        WHERE w.id = ? AND w.activo = 1
    `;
        const [rows] = await pool.query(workspaceQuery, [workspaceID]);

        if (!rows.length) return null;

        const workspace = {
            id: rows[0].id,
            name: rows[0].name,
            image: rows[0].image,
            channels: [],
            users: [],
        };

        rows.forEach((row) => {
            if (
                row.channel_id &&
                !workspace.channels.find((c) => c.id === row.channel_id)
            ) {
                workspace.channels.push({ id: row.channel_id, name: row.channel_name });
            }
            if (row.user_id && !workspace.users.find((u) => u.id === row.user_id)) {
                workspace.users.push({
                    id: row.user_id,
                    username: row.username,
                    foto_perfil: row.foto_perfil,
                });
            }
        });

        return workspace;
    }

    static async createChannel(workspaceID, name) {
        const query =
            "INSERT INTO channels (workspace_id, name, activo) VALUES (?, ?, 1)";
        const [result] = await pool.execute(query, [workspaceID, name]);

        if (result.affectedRows === 0) {
            throw new Error("No se pudo crear el canal");
        }

        return { id: result.insertId, name, workspace_id: workspaceID };
    }

    static async addMemberToWorkspace(workspaceID, userID) {
        const checkMembershipQuery = `
        SELECT * FROM workspace_members 
        WHERE workspace_id = ? AND user_id = ? AND activo = 1
    `;
        const addMembershipQuery = `
        INSERT INTO workspace_members (workspace_id, user_id, activo)
        VALUES (?, ?, 1)
    `;

        try {
            const [existingMembership] = await pool.query(checkMembershipQuery, [
                workspaceID,
                userID,
            ]);

            if (existingMembership.length === 0) {
                await pool.query(addMembershipQuery, [workspaceID, userID]);
                console.log(
                    `Usuario ${userID} agregado como miembro al workspace ${workspaceID}`
                );
            }
        } catch (error) {
            console.error("Error al verificar/agregar miembro al workspace:", error);
            throw error;
        }
    }

    static async getMessagesByChannel(channelID) {
        const query = `
      SELECT cm.id, cm.author_id, cm.channel_id, cm.text, cm.date, 
             u.username AS author_name, u.foto_perfil AS author_image,
             c.name AS channel_name, CONCAT(u.firstname, ' ', u.lastname) AS author_fullname
      FROM channels c
      LEFT JOIN channel_messages cm ON cm.channel_id = c.id AND cm.activo = 1
      LEFT JOIN users u ON cm.author_id = u.id
      WHERE c.id = ? AND c.activo = 1
      ORDER BY cm.date ASC;
  `;
        try {
            const [messages] = await pool.query(query, [channelID]);
            return messages;
        } catch (error) {
            console.error(
                "Error en WorkspacesRepository.getMessagesByChannel:",
                error
            );
            throw error;
        }
    }

    static async createMessage({ author_id, channel_id, text }) {
        const query = `
      INSERT INTO channel_messages (author_id, channel_id, text, date, activo)
      VALUES (?, ?, ?, NOW(), 1)
  `;

        try {
            const [result] = await pool.query(query, [author_id, channel_id, text]);

            if (result.affectedRows === 0) {
                throw new Error("No se pudo insertar el mensaje");
            }

            return {
                id: result.insertId,
                author_id,
                channel_id,
                text,
                date: new Date(),
            };
        } catch (error) {
            console.error("Error en WorkspacesRepository.createMessage:", error);
            throw error;
        }
    }

    static async getMessageById(messageID) {
        const query = `
          SELECT cm.id, cm.author_id, cm.channel_id, cm.text, cm.date,
                 u.username AS author_name, u.foto_perfil AS author_image,
                 c.name AS channel_name, CONCAT(u.firstname, ' ', u.lastname) AS author_fullname
          FROM channel_messages cm
          LEFT JOIN users u ON cm.author_id = u.id
          LEFT JOIN channels c ON cm.channel_id = c.id
          WHERE cm.id = ? AND cm.activo = 1
        `;
      
        try {
          const [rows] = await pool.query(query, [messageID]);
          return rows[0] || null; // Retorna el primer resultado o null si no hay resultados
        } catch (error) {
          console.error("Error en WorkspacesRepository.getMessageById:", error);
          throw error;
        }
      }
      

    static async deleteMessage(messageID) {
        const query = `
      UPDATE channel_messages 
      SET activo = 0 
      WHERE id = ? AND activo = 1
  `;

        try {
            const [result] = await pool.query(query, [messageID]);

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error en WorkspacesRepository.deleteMessage:", error);
            throw error;
        }
    }
}

export default WorkspacesRepository;
