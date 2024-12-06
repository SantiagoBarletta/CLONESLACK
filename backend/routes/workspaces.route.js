import express from "express";
import {
    createWorkspaceController,
    getAllWorkspacesController,
    getWorkspaceDetailsController,
    createChannelController
} from "../controllers/workspaces.controller.js";
import addMemberMiddleware from "../middleware/addMember.middleware.js";


const router = express.Router();



router.get("/", getAllWorkspacesController);
router.get("/:workspaceID", addMemberMiddleware, getWorkspaceDetailsController);
router.post("/:workspaceID/channels", createChannelController); // Crear canal
router.post("/", createWorkspaceController);


  



export default router;
