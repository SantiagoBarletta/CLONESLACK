import pool from "../config/dbconfig.js";

class WorkspacesRepository {
  /**
   * Obtiene todos los workspaces activos con sus canales y usuarios asociados
   * @returns {Promise<Array<Object>>}
   */
  static async getAllWorkspaces() {
    try {
      // Obtener los workspaces
      const workspacesQuery = `
        SELECT id, name, image, administrador_id 
        FROM workspaces 
        WHERE activo = 1
      `;
      const [workspaces] = await pool.query(workspacesQuery);

      if (!workspaces.length) return [];

      // Obtener los canales por workspace
      const channelsQuery = `
        SELECT id, name, workspace_id 
        FROM channels 
        WHERE workspace_id IN (?) AND activo = 1
      `;
      const workspaceIds = workspaces.map(w => w.id);
      const [channels] = await pool.query(channelsQuery, [workspaceIds]);

      // Obtener los usuarios por workspace
      const usersQuery = `
        SELECT u.id, u.username, u.foto_perfil, mw.workspace_id
        FROM users u
        JOIN workspace_members mw ON u.id = mw.user_id
        WHERE mw.workspace_id IN (?) AND mw.activo = 1
      `;
      const [users] = await pool.query(usersQuery, [workspaceIds]);

      // Estructurar los datos
      return workspaces.map(workspace => {
        const workspaceChannels = channels.filter(c => c.workspace_id === workspace.id);
        const workspaceUsers = users.filter(u => u.workspace_id === workspace.id);
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
      // Crear el workspace
      const [workspaceResult] = await pool.query(workspaceQuery, [
        name,
        description || null,
        image || null,
        administrador_id,
      ]);
  
      const workspaceId = workspaceResult.insertId;
  
      // Registrar al creador como miembro
      await pool.query(memberQuery, [workspaceId, administrador_id]);
  
      // Crear el canal principal
      const channelName = description ? `Canal inicial: ${description}` : "General";
      await pool.query(channelQuery, [channelName, workspaceId]);
  
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
  
  
}

export default WorkspacesRepository;
