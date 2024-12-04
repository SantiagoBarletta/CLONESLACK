import pool from "../config/dbconfig.js";

const ChannelsModel = {
  getByWorkspaceId: async (workspaceId) => {
    const [rows] = await pool.query(`
      SELECT id, nombre, fecha_creacion
      FROM channels
      WHERE workspace_id = ? AND activo = 1
    `, [workspaceId]);
    return rows;
  },

  create: async (nombre, workspaceId) => {
    const [result] = await pool.query(
      "INSERT INTO channels (nombre, workspace_id, activo) VALUES (?, ?, 1)",
      [nombre, workspaceId]
    );
    return result.insertId;
  },
};

export default ChannelsModel;
