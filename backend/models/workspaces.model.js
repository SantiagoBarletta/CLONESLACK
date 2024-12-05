import pool from "../config/dbconfig.js";

const WorkspacesModel = {
  getAll: async () => {
    try {
      const [rows] = await pool.query("SELECT * FROM workspaces WHERE activo = 1");
      return rows; // Devuelve los resultados correctamente
    } catch (error) {
      console.error("Error al obtener los workspaces:", error);
      throw error; // Propaga el error para que el controlador lo maneje
    }
  },

  getUsersByWorkspace: async (workspaceId) => {
    const [rows] = await pool.query(
      "SELECT users.id, users.name, users.foto_perfil FROM miembros_workspace " +
      "JOIN users ON miembros_workspace.usuario_id = users.id " +
      "WHERE miembros_workspace.workspace_id = ? AND miembros_workspace.activo = 1",
      [workspaceId]
    );
    return rows;
  },

  create: async (name, description, image, administrador_id) => {
    try {
      const [result] = await pool.query(
        "INSERT INTO workspaces (name, descripcion, image, administrador_id, activo) VALUES (?, ?, ?, ?, 1)",
        [name, description, image, administrador_id]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error al crear workspace:", error);
      throw error;
    }
  },
};


export default WorkspacesModel;
