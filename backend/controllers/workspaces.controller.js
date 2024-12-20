import jwt from "jsonwebtoken";
import ENVIROMENT from "../config/enviroment.js";
import WorkspacesRepository from "../repositories/workspaces.repository.js";
import ResponseBuilder from "../helpers/builders/responseBuilders.js";

export const createWorkspaceController = async (req, res, next) => {
  try {
    const { name, description, image, token } = req.body;
    const decodedToken = jwt.verify(token, ENVIROMENT.SECRET_KEY);
    const administrador_id = decodedToken.user_id;

    if (!administrador_id) {
      throw new Error("No se pudo obtener el ID del usuario autenticado.");
    }

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

export const getMessagesByChannelController = async (req, res) => {
  const { channelID } = req.params;

  try {
      const messages = await WorkspacesRepository.getMessagesByChannel(channelID);
      res.status(200).json({
          ok: true,
          data: messages,
      });
  } catch (error) {
      console.error("Error al obtener mensajes:", error);
      res.status(500).json({
          ok: false,
          message: "Error al obtener mensajes. Intenta más tarde.",
      });
  }
};

export const createMessageController = async (req, res) => {
  const { channelID } = req.params;
  const { text } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, ENVIROMENT.SECRET_KEY);
    const author_id = decodedToken.user_id;

    if (!author_id) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autorizado",
      });
    }

    if (!text || text.trim() === "") {
      return res.status(400).json({
        ok: false,
        message: "El mensaje no puede estar vacío",
      });
    }

    // Crear el mensaje en la base de datos
    const newMessage = await WorkspacesRepository.createMessage({
      author_id,
      channel_id: channelID,
      text,
    });

    // Obtener los datos completos del mensaje recién creado
    const fullMessage = await WorkspacesRepository.getMessageById(newMessage.id);

    if (!fullMessage) {
      throw new Error("Error al obtener los datos completos del mensaje");
    }

    res.status(201).json({
      ok: true,
      message: "Mensaje enviado con éxito",
      data: fullMessage, // Responde con los datos enriquecidos
    });
  } catch (error) {
    console.error("Error al crear mensaje:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};


export const deleteMessageController = async (req, res) => {
  const { messageID } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  try {
      const decodedToken = jwt.verify(token, ENVIROMENT.SECRET_KEY);
      const userID = decodedToken.user_id;

      if (!userID) {
          return res.status(401).json({ ok: false, message: "No autorizado" });
      }

      const message = await WorkspacesRepository.getMessageById(messageID);
      if (!message) {
          return res.status(404).json({ ok: false, message: "Mensaje no encontrado" });
      }

      if (message.author_id !== userID) {
          return res.status(403).json({ ok: false, message: "No tienes permiso para eliminar este mensaje" });
      }

      const result = await WorkspacesRepository.deleteMessage(messageID);

      if (!result) {
          return res.status(500).json({ ok: false, message: "Error al eliminar el mensaje" });
      }

      res.status(200).json({ ok: true, message: "Mensaje eliminado con éxito" });
  } catch (error) {
      console.error("Error al eliminar mensaje:", error);
      res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

