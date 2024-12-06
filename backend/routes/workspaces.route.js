import express from "express";
import {
    createWorkspaceController,
    getAllWorkspacesController,
    getWorkspaceDetailsController,
} from "../controllers/workspaces.controller.js";
import addMemberMiddleware from "../middleware/addMember.middleware.js";
import { createChannelController } from "../controllers/channels.controller.js";


const router = express.Router();



router.get("/", getAllWorkspacesController);
router.get("/:workspaceID", addMemberMiddleware, getWorkspaceDetailsController);
router.post("/", createWorkspaceController);
router.post("/:workspaceID/channels", createChannelController);



  



export default router;
