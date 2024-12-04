import WorkspacesModel from "../models/workspaces.model.js";

export const getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await WorkspacesModel.getAll();
    res.status(200).json({
      ok: true,
      workspaces,
    });
  } catch (error) {
    console.error("Error al obtener workspaces:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener los espacios de trabajo.",
    });
  }
};

export const createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        ok: false,
        message: "El nombre y la descripción son obligatorios.",
      });
    }

    const workspaceId = await WorkspacesModel.create(name, description);
    res.status(201).json({
      ok: true,
      message: "Espacio de trabajo creado con éxito.",
      workspaceId,
    });
  } catch (error) {
    console.error("Error al crear workspace:", error);
    res.status(500).json({
      ok: false,
      message: "Error al crear el espacio de trabajo.",
    });
  }
};
