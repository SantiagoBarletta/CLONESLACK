import React from "react";
import { useNavigate } from "react-router-dom";
import "./Help.css";

const Help = () => {
  const navegar = useNavigate();

  const handleClose = () => {
    navegar(-1);
  };

  return (
    <div className="help">
      <div className="help-container">
        <p onClick={handleClose} className="close">&times;</p>
        <h1>Proyecto CLONESLACK</h1>
        <p>
          Este proyecto es una aplicación de mensajería similar a Slack, desarrollada con
          <strong> React</strong> en el frontend y <strong>Node.js con Express</strong> en el backend.
          La aplicación permite a los usuarios crear espacios de trabajo (workspaces), canales y enviar mensajes en tiempo real.
        </p>

        <h2>Características</h2>
        <h3>Frontend:</h3>
        <ul>
          <li><strong>Espacios de Trabajo:</strong> Listado de workspaces con cantidad de usuarios y creación de nuevos.</li>
          <li><strong>Canales:</strong> Navegación entre canales, búsqueda y creación de canales.</li>
          <li><strong>Mensajes:</strong> Envío y eliminación de mensajes.</li>
          <li><strong>Perfil del Usuario:</strong> Edición con validación de imágenes (máximo 1MB).</li>
          <li><strong>Rutas protegidas:</strong> Navegación autenticada con JWT.</li>
        </ul>

        <h3>Backend:</h3>
        <ul>
          <li><strong>Autenticación segura:</strong> Login, registro y contraseñas cifradas con bcrypt.</li>
          <li><strong>Protección de rutas:</strong> Middleware JWT.</li>
          <li><strong>Base de datos:</strong> Persistencia de datos con MySQL.</li>
          <li><strong>API RESTful:</strong> Manejo de workspaces, canales y mensajes.</li>
        </ul>

        <h2>Tecnologías Utilizadas</h2>
        <ul>
          <li>React</li>
          <li>React Router</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>MySQL</li>
        </ul>

        <h2>Contacto</h2>
        <ul>
          <li>
            <strong>Correo electrónico:</strong>{" "}
            <a href="mailto:santiagobarletta@outlook.com">santiagobarletta@outlook.com</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
