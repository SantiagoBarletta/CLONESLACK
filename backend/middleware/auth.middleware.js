import jwt from 'jsonwebtoken';
import ENVIROMENT from '../config/enviroment.js';

const authMiddleware = () => {
  return (req, res, next) => {
    try {
      const auth_header = req.headers["authorization"];
      if (!auth_header) {
        return res.status(401).json({ message: "No autorizado" });
      }

      const token = auth_header.split(" ")[1];
      const decoded = jwt.verify(token, ENVIROMENT.SECRET_KEY);
      req.user = decoded;

      console.log("Middleware autenticación completado. Usuario:", req.user);
      next();
    } catch (error) {
      console.error("Error en middleware de autenticación:", error);
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  };
};


export default authMiddleware;
