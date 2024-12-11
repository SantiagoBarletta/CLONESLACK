import express from "express";
import {
    createWorkspaceController,
    getAllWorkspacesController,
    getWorkspaceDetailsController,
    getMessagesByChannelController,
    createMessageController,
    deleteMessageController,
} from "../controllers/workspaces.controller.js";
import addMemberMiddleware from "../middleware/addMember.middleware.js";
import { createChannelController } from "../controllers/channels.controller.js";





const router = express.Router();


router.get("/", getAllWorkspacesController);
router.get("/:workspaceID", addMemberMiddleware, getWorkspaceDetailsController);
router.post("/", createWorkspaceController);
router.post("/:workspaceID/channels", createChannelController);
router.get("/:workspaceID/channels/:channelID/messages", getMessagesByChannelController);
router.post("/:workspaceID/channels/:channelID/messages", createMessageController);
router.delete("/messages/:messageID", deleteMessageController);



  



export default router;
