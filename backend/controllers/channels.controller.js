// controllers/channels.controller.js
import WorkspacesRepository from "../repositories/workspaces.repository.js";

export const createChannelController = async (req, res) => {
  try {
    const { workspaceID } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        ok: false,
        message: "El nombre del canal es obligatorio.",
      });
    }

    const newChannel = await WorkspacesRepository.createChannel(workspaceID, name);

    res.status(201).json({
      ok: true,
      message: "Canal creado con éxito.",
      data: newChannel,
    });
  } catch (error) {
    console.error("Error al crear canal:", error);
    res.status(500).json({
      ok: false,
      message: "Error al crear el canal. Intenta más tarde.",
    });
  }
};

