import React, { useState } from 'react';
import './NewWorkspaceHeader.css';


const NewWorkspaceHeader = () => {
  return (
    <div className="workspaces-header">
      
      <div className='logo'><img src='../Imagenes/slack.png' alt="logo" /></div>
      <h2>¿Como se llama tu nuevo espacio de trabajo?</h2>
      <p className="select">Este será el nombre de tu espacio de trabajo en Slasher: elige algo que te identifique.</p>
    </div>
    
  );
};

export default NewWorkspaceHeader;
