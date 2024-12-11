import ENVIROMENT from "../config/enviroment.js";

const allowed_origins = [
    'http://localhost:5173',
    ENVIROMENT.FRONTEND_URL
];

export const customCorsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowed_origins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
};