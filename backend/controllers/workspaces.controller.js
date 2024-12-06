import jwt from "jsonwebtoken";
import ENVIROMENT from "../config/enviroment.js";
import WorkspacesRepository from "../repositories/workspaces.repository.js";
import ResponseBuilder from "../helpers/builders/responseBuilders.js";
import AppError from "../helpers/errors/app.error.js";
import ChannelsRepository from "../repositories/channels.repository.js";

// Crear un nuevo workspace
export const createWorkspaceController = async (req, res, next) => {
  try {
    const { name, description, image, token } = req.body;

    // Decodificar el token para obtener el administrador_id
    const decodedToken = jwt.verify(token, ENVIROMENT.SECRET_KEY);
    const administrador_id = decodedToken.user_id;

    if (!administrador_id) {
      throw new Error("No se pudo obtener el ID del usuario autenticado.");
    }

    // Crear el workspace
    const newWorkspace = await WorkspacesRepository.createWorkspace({
      name,
      description,
      image,
      administrador_id,
    });

    res.status(201).json({
      ok: true,
      message: "Workspace creado con éxito",
      data: newWorkspace,
    });
  } catch (error) {
    console.error("Error al crear workspace:", error);
    res.status(500).json({
      ok: false,
      message: error.message || "Error al crear el workspace. Intenta más tarde.",
    });
  }
};



// Obtener todos los workspaces activos
export const getAllWorkspacesController = async (req, res, next) => {
  try {
    const workspaces = await WorkspacesRepository.getAllWorkspaces();

    const response = new ResponseBuilder()
      .setOk(true)
      .setCode("SUCCESS")
      .setStatus(200)
      .setData(workspaces)
      .build();

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener los workspaces:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener los espacios de trabajo.",
    });
  }
};


// Obtener un workspace por su ID
export const getWorkspaceDetailsController = async (req, res) => {
  const { workspaceID } = req.params;

  try {
      const workspace = await WorkspacesRepository.getWorkspaceByIdWithDetails(workspaceID);
      if (!workspace) {
          return res.status(404).json({ ok: false, message: "Workspace no encontrado" });
      }
      res.status(200).json({ ok: true, data: workspace });
  } catch (error) {
      console.error("Error al obtener detalles del workspace:", error);
      res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

export const createChannelController = async (req, res) => {
  const { workspaceID } = req.params;
  const { name } = req.body;

  try {
      const newChannel = await WorkspacesRepository.createChannel(workspaceID, name);
      res.status(201).json({ ok: true, data: newChannel });
  } catch (error) {
      console.error("Error al crear canal:", error);
      res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};
