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
          Este proyecto es una aplicación de mensajería similar a Slack, desarrollada con <strong>React</strong> en el frontend y <strong>Node.js con Express</strong> en el backend. 
          La aplicación permite a los usuarios crear espacios de trabajo (workspaces), canales y enviar mensajes en tiempo real.
        </p>

        <h2>Características</h2>
        <h3>Frontend:</h3>
        <ul>
            <li><strong>Espacios de Trabajo:</strong> Listado de workspaces con la cantidad de usuarios y la posibilidad de crear nuevos.</li>
            <li><strong>Canales:</strong> Desde el header se puede navegar hacia atrás y hacia adelante. Buscar y resaltar mensajes. También desde ayuda (?) se puede acceder al contenido del archivo "Readme". Dentro de cada espacio de trabajo, los usuarios pueden navegar por los distintos canales y crear canales nuevos. Los canales permiten el envío de mensajes.</li>
            <li><strong>Mensajes:</strong> Los usuarios pueden enviar mensajes en cada canal. Los mensajes se muestran en tiempo real y se pueden eliminar.</li>
            <li><strong>Información de Contacto:</strong> Los usuarios pueden ver la información detallada de cada contacto dentro de un canal. Esto incluye detalles como el nombre, la foto de perfil y correo electrónico.</li>
        </ul>

        <h3>Backend:</h3>
        <ul>
            <li><strong>Autenticación segura:</strong> Login y registro de usuarios con JWT. Contraseñas cifradas con <code>bcrypt</code>.</li>
            <li><strong>Protección de rutas:</strong> Acceso restringido mediante middleware JWT.</li>
            <li><strong>Base de datos:</strong> Persistencia de datos con <strong>MySQL</strong>.</li>
            <li><strong>API RESTful:</strong> Endpoints para manejar workspaces, canales, mensajes y actualización de perfil.</li>
        </ul>

        <h2>Tecnologías Utilizadas</h2>
        <h3>Frontend:</h3>
        <ul>
            <li>React</li>
            <li>React Router</li>
            <li>JavaScript</li>
            <li>CSS</li>
        </ul>

        <h3>Backend:</h3>
        <ul>
            <li>Node.js</li>
            <li>Express</li>
            <li>MySQL</li>
            <li>Bcrypt</li>
            <li>JSON Web Tokens (JWT)</li>
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
