// src/Chanels/Help/Help.jsx
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
      <h1>Proyecto de Mensajería Similar a Slack
        </h1>
      <p>Este proyecto es una aplicación de mensajería similar a Slack, desarrollada con React. La aplicación permite a los usuarios crear diferentes espacios de trabajo (workspaces) y canales dentro de los mismos. Los usuarios pueden interactuar con los canales, enviar mensajes y ver la información de contacto de los participantes.</p>

      <h2>Características</h2>
      <ul>
        <li><strong>Espacios de Trabajo (Workspaces)</strong>:     Listado de Espacios de trabajo, muestra la cantidad de usuarios y miniaturas de sus fotos de perfil.
        Los usuarios pueden crear múltiples espacios de trabajo. Cada espacio de trabajo es un contenedor para los diferentes canales y mensajes.</li>
        <li><strong>Canales</strong>:     Desde el header se puede navegar hacia atras y hacia adelante. Buscar y resaltar mensajes. Tambien desde ayuda (?) se puede acceder al contenido del archivo "Readme".
        Dentro de cada espacio de trabajo, los usuarios pueden navegar por los distintos canales y crear canales nuevos. Los canales permiten el enevío de mensajes. </li>
        <li><strong>Mensajes</strong>: Los usuarios pueden enviar mensajes en cada canal. Los mensajes se muestran en tiempo real y se pueden eliminar.</li>
        <li><strong>Información de Contacto</strong>: Los usuarios pueden ver la información detallada de cada contacto dentro de un canal. Esto incluye detalles como el nombre, la foto de perfil y correo electrónico.</li>
      </ul>

      <h2>Tecnologías Utilizadas</h2>
      <ul>
        <li><strong>React</strong></li>
        <li><strong>React Router</strong></li>
        <li><strong>React Icons</strong></li>
        <li><strong>JavaScript</strong></li>
        <li><strong>CSS</strong></li>
      </ul>

      <h2>Instalación y Configuración</h2>
      <p>Para instalar y ejecutar el proyecto localmente, sigue estos pasos:</p>
      <ol>
        <li><strong>Clona el Repositorio</strong></li>
      </ol>
      <pre><code>git clone https://github.com/SantiagoBarletta/proyectoSlasher</code></pre>

      <h2>Contacto</h2>
      <ul>
        <li><strong>Correo electrónico</strong>: <a href="mailto:santiagobarletta@outlook.com">santiagobarletta@outlook.com</a></li>
      </ul>
    </div>
  );
};

export default Help;
