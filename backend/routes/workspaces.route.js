import express from "express";
import { getAllWorkspaces, createWorkspace } from "../controllers/workspaces.controller.js";

const router = express.Router();

router.get("/", getAllWorkspaces); // Obtener todos los workspaces
router.post("/", createWorkspace); // Crear un nuevo workspace

export default router;
