import jwt from 'jsonwebtoken';
import ENVIROMENT from '../config/enviroment.js';

const authMiddleware = (roles_permitidos) => {
  return (req, res, next) => {
    try {
      const auth_header = req.headers['authorization'];

      if (!auth_header) {
        return res.status(401).json({ message: 'No autorizado', status: 401 });
      }

      const access_Token = auth_header.split(' ')[1];

      if (!access_Token) {
        return res.status(401).json({ message: 'Formato incorrecto de token', status: 401 });
      }

      const user_session_payload_decoded = jwt.verify(access_Token, ENVIROMENT.SECRET_KEY);

      if (!roles_permitidos.includes(user_session_payload_decoded.role)) {
        console.log("Rol del usuario:", user_session_payload_decoded.role);
        console.log("Roles permitidos:", roles_permitidos);
        return res.status(403).json({
            message: 'No tienes permiso para acceder a este recurso',
            status: 403,
        });
    }
    

      // Asignar los datos del usuario decodificado a la request
      req.user = user_session_payload_decoded;

      next();
    } catch (error) {
      console.error("Error en el middleware de autenticación:", error);
      return res.status(401).json({ message: 'Token inválido o expirado', status: 401 });
    }
  };
};

export default authMiddleware;
