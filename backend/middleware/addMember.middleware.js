import jwt from "jsonwebtoken";
import ENVIROMENT from "../config/enviroment.js";
import WorkspacesRepository from "../repositories/workspaces.repository.js";

const addMemberMiddleware = async (req, res, next) => {
    try {
        const { workspaceID } = req.params;
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ ok: false, message: "No autorizado" });
        }

        const decodedToken = jwt.verify(token, ENVIROMENT.SECRET_KEY);
        const userId = decodedToken.user_id;

        if (!userId) {
            return res.status(400).json({ ok: false, message: "Token inválido" });
        }

        // Registrar al usuario como miembro si no lo es
        await WorkspacesRepository.addMemberToWorkspace(workspaceID, userId);

        next(); // Continuar con el siguiente middleware o controlador
    } catch (error) {
        console.error("Error en addMemberMiddleware:", error);
        res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
};

export default addMemberMiddleware;
