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



router.get("/",  getAllWorkspacesController);
router.get("/:workspace_id",  getWorkspaceByIdController); // Obtener un workspace por ID
router.post("/",  (req, res, next) => {
    console.log("Solicitud POST llegó al backend:", req.method, req.body);
    next();
}, createWorkspaceController);

  
router.put("/:workspace_id", authMiddleware, updateWorkspaceController); // Actualizar un workspace
router.delete("/:workspace_id", authMiddleware, deleteWorkspaceController); // Desactivar un workspace

export default router;
