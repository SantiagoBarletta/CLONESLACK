import express from "express";
import {
    createWorkspaceController,
    getAllWorkspacesController,
    getWorkspaceByIdController,
    updateWorkspaceController,
    deleteWorkspaceController,
} from "../controllers/workspaces.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();



router.get("/", getAllWorkspacesController);
router.get("/:workspace_id",  getWorkspaceByIdController);
router.post("/", createWorkspaceController);


  
router.put("/:workspace_id", authMiddleware, updateWorkspaceController); 
router.delete("/:workspace_id", authMiddleware, deleteWorkspaceController); 

export default router;
