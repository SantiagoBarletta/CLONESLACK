import React, { useState } from 'react';
import './WorkspacesHeader.css';

const WorkspacesHeader = () => {

  const handleLogout = () => {
    sessionStorage.removeItem("access-token"); 
    window.location.href = "/login"; 
  };
  return (
    <div className="workspaces-header">
      
      <div className='logo'><img src='Imagenes/slack.png' alt="logo" /><button onClick={handleLogout} className="logout-button">Logout</button></div>
      <h2>¡Hola denuevo! <span>¡Mantén tu machete afilado!</span></h2>
      <p className="select">Elige uno de los siguientes espacios de trabajo para volver a trabajar con tu equipo.</p>
    </div>
    
  );
};

export default WorkspacesHeader;
