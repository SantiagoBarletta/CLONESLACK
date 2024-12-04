import express from "express";
import { getAllWorkspaces, createWorkspace } from "../controllers/workspaces.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllWorkspaces); 
router.post("/", authMiddleware, createWorkspace); 

export default router;
