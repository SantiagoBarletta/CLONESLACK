import WorkspacesModel from "../models/workspaces.model.js";

export const getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await WorkspacesModel.getAll();
    return res.status(200).json({
      ok: true,
      message: "Workspaces obtenidos con éxito",
      data: workspaces,
    });
  } catch (error) {
    console.error("Error al obtener los workspaces:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener los workspaces. Intenta más tarde.",
    });
  }
};

export const createWorkspace = async (req, res) => {
  const { name, description, image } = req.body;

  if (!name) {
    return res.status(400).json({
      ok: false,
      message: "El nombre del workspace es obligatorio",
    });
  }

  try {
    const administrador_id = req.user.id;

    const workspaceId = await WorkspacesModel.create(
      name,
      description || null,
      image || null,
      administrador_id
    );

    return res.status(201).json({
      ok: true,
      message: "Workspace creado con éxito",
      data: { workspaceId },
    });
  } catch (error) {
    console.error("Error al crear workspace:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al crear el workspace. Intenta más tarde.",
    });
  }
};
