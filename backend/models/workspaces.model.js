import pool from "../config/dbconfig.js";

const WorkspacesModel = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM workspaces WHERE activo = 1");
    return rows;
  },

  create: async (name, description, image, administrador_id) => {
    const [result] = await pool.query(
      "INSERT INTO workspaces (name, descripcion, image, administrador_id, activo) VALUES (?, ?, ?, ?, 1)",
      [name, description, image, administrador_id]
    );
    return result.insertId;
  },
};

export default WorkspacesModel;
