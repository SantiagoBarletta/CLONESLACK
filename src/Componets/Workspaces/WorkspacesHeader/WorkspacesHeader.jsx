import React, { useState } from 'react';
import './WorkspacesHeader.css';

const WorkspacesHeader = () => {
  return (
    <div className="workspaces-header">
      
      <div className='logo'><img src='Imagenes/slack.png' alt="logo" /></div>
      <h2>¡Hola denuevo! <span>¡Mantén tu machete afilado!</span></h2>
      <p className="select">Elige uno de los siguientes espacios de trabajo para volver a trabajar con tu equipo.</p>
    </div>
    
  );
};

export default WorkspacesHeader;
