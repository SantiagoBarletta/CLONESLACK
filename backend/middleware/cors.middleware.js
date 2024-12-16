import ENVIROMENT from "../config/enviroment.js";

const allowed_origins = [
    "http://localhost:5173",
    ENVIROMENT.FRONTEND_URL 
];

export const customCorsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
  
    if (origin && allowed_origins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.setHeader("Access-Control-Allow-Credentials", "true");
    } else if (origin) {
      
      return res.status(403).json({ error: "Origen no permitido" });
    }
  
    if (req.method === "OPTIONS") {
      return res.sendStatus(204); 
    }
  
    next();
  };
