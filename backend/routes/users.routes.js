import { Router } from "express";
import { getUserByIdController, updateUserController } from "../controllers/users.controller.js";

const router = Router();


router.get("/:userID", getUserByIdController);


router.put("/:userID", updateUserController);

export default router;
