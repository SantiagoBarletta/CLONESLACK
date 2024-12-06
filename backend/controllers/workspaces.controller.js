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
