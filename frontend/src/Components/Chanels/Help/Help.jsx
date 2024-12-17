import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Help.css';

const Help = () => {
  const navegar = useNavigate();

  const handleClose = () => {
    navegar(-1); 
  };

  return (
    <div className='help'>
      <p onClick={handleClose} className='close'>Cerrar</p>
      <h1>Proyecto CLONESLACK</h1>
    <p>
        Este proyecto es una aplicación de mensajería similar a Slack, desarrollada con 
        <strong>React</strong> en el frontend y <strong>Node.js con Express</strong> en el backend. 
        La aplicación permite a los usuarios crear espacios de trabajo (workspaces), canales y 
        enviar mensajes en tiempo real.
    </p>

    <h2>Características</h2>

    <h3>Frontend:</h3>
    <ul>
        <li><strong>Espacios de Trabajo:</strong> Listado de workspaces con la cantidad de usuarios y la posibilidad de crear nuevos.</li>
        <li><strong>Canales:</strong> Navegación entre canales, búsqueda de mensajes y creación de canales nuevos.</li>
        <li><strong>Mensajes:</strong> Envío de mensajes en tiempo real y eliminación de mensajes existentes.</li>
        <li><strong>Perfil del Usuario:</strong> Edición de perfil con validación de imágenes (máximo 1MB) y previsualización.</li>
        <li><strong>Rutas protegidas:</strong> Navegación autenticada mediante <code>react-router-dom</code> y JWT.</li>
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

    <h2>Instalación y Configuración</h2>
    <h3>Clona el repositorio:</h3>
    <pre><code>
git clone https://github.com/SantiagoBarletta/CLONESLACK
cd CLONESLACK
    </code></pre>

    <h3>Instalación de dependencias:</h3>
    <p><strong>Frontend:</strong></p>
    <pre><code>
cd frontend
npm install
npm run dev
    </code></pre>

    <p><strong>Backend:</strong></p>
    <pre><code>
cd backend
npm install
npm start
    </code></pre>

    <h3>Configuración de variables de entorno:</h3>
    <p>Crea un archivo <code>.env</code> en la carpeta del backend con las siguientes variables:</p>
    <pre><code>
PORT=5000
JWT_SECRET=tu_secreto
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=cloneslack
    </code></pre>

    <h2>Uso del Sitio</h2>
    <ol>
        <li>Inicia sesión o regístrate.</li>
        <li>Crea un espacio de trabajo.</li>
        <li>Dentro del workspace, crea canales y envía mensajes.</li>
        <li>Edita tu perfil, cambia la imagen y visualiza la previsualización.</li>
        <li>Navega entre workspaces y canales.</li>
    </ol>

    <h2>Contacto</h2>
    <p>
        <strong>Correo electrónico:</strong> 
        <a href="mailto:santiagobarletta@outlook.com">santiagobarletta@outlook.com</a>
    </p>
    </div>
  );
};

export default Help;
