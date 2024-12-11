import ENVIROMENT from "../config/enviroment.js";

const allowed_origins = [
    "http://localhost:5173",
    ENVIROMENT.FRONTEND_URL // Asegúrate de que esto está definido
];

export const customCorsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;

    // Validar el origen y configurarlo solo si está permitido
    if (origin && allowed_origins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    next();
};
