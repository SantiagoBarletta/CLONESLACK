import pool from "../config/dbconfig.js";

class WorkspacesRepository {
    /**
     * Crea un nuevo workspace
     * @param {Object} new_workspace_data - Datos del workspace a almacenar
     * @returns {Promise<Object>} - Promesa que resuelve al workspace creado
     */
    static async createWorkspace(new_workspace_data) {
        const { name, description, image, administrador_id } = new_workspace_data;

        const query = `
            INSERT INTO workspaces (name, descripcion, image, administrador_id, activo) 
            VALUES (?, ?, ?, ?, 1)
        `;

        try {
            const [result] = await pool.execute(query, [
                name,
                description || null,
                image || null,
                administrador_id,
            ]);

            if (result.affectedRows > 0) {
                return {
                    id: result.insertId,
                    name,
                    description,
                    image,
                    administrador_id,
                };
            } else {
                throw new Error("No se pudo crear el workspace");
            }
        } catch (error) {
            console.error("Error al crear workspace:", error);
            throw error;
        }
    }

    /**
     * Obtiene todos los workspaces activos
     * @returns {Promise<Array<Object>>} - Promesa que resuelve a un array de workspaces
     */
    static async getAllWorkspaces() {
        try {
          const query = `SELECT * FROM workspaces WHERE activo = 1`;
          const [rows] = await pool.execute(query);
          console.log("Consulta exitosa, workspaces:", rows);
          return rows;
        } catch (error) {
          console.error("Error en la consulta getAllWorkspaces:", error);
          throw error;
        }
      }
      

    /**
     * Obtiene un workspace por su ID
     * @param {number} workspace_id - ID del workspace
     * @returns {Promise<Object|null>} - Promesa que resuelve al workspace o null si no existe
     */
    static async getWorkspaceById(workspace_id) {
        const query = `
            SELECT * 
            FROM workspaces 
            WHERE id = ? AND activo = 1
        `;

        try {
            const [rows] = await pool.execute(query, [workspace_id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error al obtener workspace por ID:", error);
            throw error;
        }
    }

    /**
     * Actualiza un workspace por ID
     * @param {number} workspace_id - ID del workspace a actualizar
     * @param {Object} updated_data - Datos a actualizar en el workspace
     * @returns {Promise<Object>} - Promesa que resuelve al workspace actualizado
     */
    static async updateWorkspace(workspace_id, updated_data) {
        const fields = [];
        const values = [];

        for (const key in updated_data) {
            fields.push(`${key} = ?`);
            values.push(updated_data[key]);
        }

        const query = `
            UPDATE workspaces
            SET ${fields.join(", ")}
            WHERE id = ? AND activo = 1
        `;

        values.push(workspace_id);

        try {
            const [result] = await pool.execute(query, values);

            if (result.affectedRows > 0) {
                return { id: workspace_id, ...updated_data };
            } else {
                throw new Error(`No se encontró el workspace con ID ${workspace_id}.`);
            }
        } catch (error) {
            console.error("Error al actualizar workspace:", error);
            throw error;
        }
    }

    /**
     * Elimina un workspace (actualiza su estado a inactivo)
     * @param {number} workspace_id - ID del workspace a eliminar
     * @returns {Promise<Object>} - Promesa que resuelve al workspace actualizado
     */
    static async deleteWorkspace(workspace_id) {
        const query = `
            UPDATE workspaces
            SET activo = 0
            WHERE id = ?
        `;
        console.log("Datos insertados en la base de datos:", {
            name,
            description,
            image,
            administrador_id,
          });
          
        try {
            const [result] = await pool.execute(query, [workspace_id]);

            if (result.affectedRows > 0) {
                return { id: workspace_id, activo: false };
            } else {
                throw new Error(`No se encontró el workspace con ID ${workspace_id}.`);
            }
        } catch (error) {
            console.error("Error al eliminar workspace:", error);
            throw error;
        }
    }
}

export default WorkspacesRepository;
