import jwt from "jsonwebtoken";
import ENVIROMENT from "../config/enviroment.js";
import WorkspacesRepository from "../repositories/workspaces.repository.js";
import ResponseBuilder from "../helpers/builders/responseBuilders.js";
import AppError from "../helpers/errors/app.error.js";
import ChannelsRepository from "../repositories/channels.repository.js";

// Crear un nuevo workspace
export const createWorkspaceController = async (req, res) => {
  try {
      const { name, description, image, token } = req.body; // Incluye el token en el cuerpo de la solicitud

      if (!name) {
          return res.status(400).json({
              ok: false,
              message: "El nombre del workspace es obligatorio",
          });
      }

      // Decodificar el token JWT para obtener el user_id
      let administrador_id;
      try {
          const decoded = jwt.verify(token, ENVIROMENT.SECRET_KEY);
          administrador_id = decoded.user_id;
      } catch (error) {
          return res.status(401).json({
              ok: false,
              message: "Token inválido o expirado",
          });
      }

      // Crear el workspace
      const newWorkspace = await WorkspacesRepository.createWorkspace({
          name,
          description: description || null,
          image: image || "/Imagenes/default-image.png",
          administrador_id,
      });

      // Crear el canal principal del workspace
      const mainChannel = await ChannelsRepository.createChannel({
          name: "General", // Nombre predeterminado del canal principal
          workspace_id: newWorkspace.id,
      });

      // Responder con los datos del workspace y su canal principal
      res.status(201).json({
          ok: true,
          message: "Workspace creado con éxito",
          data: {
              workspace: newWorkspace,
              main_channel: mainChannel,
          },
      });
  } catch (error) {
      console.error("Error al crear workspace:", error);
      res.status(500).json({
          ok: false,
          message: "Error interno del servidor al crear el workspace.",
      });
  }
};

// Obtener todos los workspaces activos
export const getAllWorkspacesController = async (req, res) => {
  try {
    const workspaces = await WorkspacesRepository.getAllWorkspaces();
    console.log("Workspaces obtenidos:", workspaces);

    return res.status(200).json({
      ok: true,
      message: "Workspaces obtenidos con éxito",
      data: workspaces,
    });
  } catch (error) {
    console.error("Error al obtener workspaces:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener workspaces",
    });
  }
};


// Obtener un workspace por su ID
export const getWorkspaceByIdController = async (req, res, next) => {
    try {
        const { workspace_id } = req.params;
        const workspace = await WorkspacesRepository.getWorkspaceById(workspace_id);

        if (!workspace) {
            return next(new AppError('Workspace no encontrado', 404));
        }

        const response = new ResponseBuilder()
            .setOk(true)
            .setCode('SUCCESS')
            .setStatus(200)
            .setData(workspace)
            .build();

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Actualizar un workspace por ID
export const updateWorkspaceController = async (req, res, next) => {
    try {
        const { workspace_id } = req.params;
        const updated_data = req.body;

        const updatedWorkspace = await WorkspacesRepository.updateWorkspace(workspace_id, updated_data);

        if (!updatedWorkspace) {
            return next(new AppError('Workspace no encontrado', 404));
        }

        const response = new ResponseBuilder()
            .setOk(true)
            .setCode('WORKSPACE_UPDATED')
            .setStatus(200)
            .setData(updatedWorkspace)
            .build();

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Eliminar (desactivar) un workspace
export const deleteWorkspaceController = async (req, res, next) => {
    try {
        const { workspace_id } = req.params;

        const deletedWorkspace = await WorkspacesRepository.deleteWorkspace(workspace_id);

        if (!deletedWorkspace) {
            return next(new AppError('Workspace no encontrado', 404));
        }

        const response = new ResponseBuilder()
            .setOk(true)
            .setCode('WORKSPACE_DELETED')
            .setStatus(200)
            .setData(deletedWorkspace)
            .build();

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};
