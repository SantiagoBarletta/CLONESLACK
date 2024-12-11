import express from "express";
import { getPrivateMessages, sendPrivateMessage } from "../controllers/privateMessages.controller.js";

const privateMessagesRouter = express.Router();

// Ruta para obtener mensajes privados entre dos usuarios
privateMessagesRouter.get("/:userID", getPrivateMessages);

// Ruta para enviar un mensaje privado
privateMessagesRouter.post("/", sendPrivateMessage);

export default privateMessagesRouter;
