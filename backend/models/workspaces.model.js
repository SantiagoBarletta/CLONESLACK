import pool from "../config/dbconfig.js";

const WorkspacesModel = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM workspaces WHERE activo = 1");
    return rows;
  },

  create: async (name, description) => {
    const [result] = await pool.query(
      "INSERT INTO workspaces (name, description, activo) VALUES (?, ?, 1)",
      [name, description]
    );
    return result.insertId;
  },
};

export default WorkspacesModel;
