import express from "express";
import { getPrivateMessages, sendPrivateMessage } from "../controllers/privateMessages.controller.js";

const privateMessagesRouter = express.Router();

privateMessagesRouter.get("/:userID", getPrivateMessages);
privateMessagesRouter.post("/", sendPrivateMessage);

export default privateMessagesRouter;
