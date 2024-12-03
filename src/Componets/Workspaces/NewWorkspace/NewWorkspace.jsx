import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NewWorkspace.css';

function NewWorkspace() {
  const [name, setName] = useState('');
  const [channelName, setChannelName] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && channelName) {
      const storedWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
      
      const newWorkspaceId = `W00${storedWorkspaces.length ? parseInt(storedWorkspaces[storedWorkspaces.length - 1].id.substring(3)) + 1 : 1}`;
      
      let highestChannelIdNumber = 0;
      storedWorkspaces.forEach(workspace => {
        workspace.channels.forEach(channel => {
          const channelIdNumber = parseInt(channel.id.substring(3));
          if (channelIdNumber > highestChannelIdNumber) {
            highestChannelIdNumber = channelIdNumber;
          }
        });
      });
      const newChannelId = `C00${highestChannelIdNumber + 1}`;

      const newWorkspace = {
        id: newWorkspaceId,
        name: name,
        image: '/Imagenes/default-image.png',
        users: [],
        creation_date: new Date().toISOString(),
        channels: [
          {
            id: newChannelId,
            name: channelName
          }
        ]
      };
      const updatedWorkspaces = [...storedWorkspaces, newWorkspace];
      localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces));
      setRedirect(true);
    }
  };

  useEffect(() => {
    if (redirect) {
      window.location.href = '/';
    }
  }, [redirect]);

  return (
    <div className='new-workspace-container'>
      <form onSubmit={handleSubmit} className='form-new-workspace'>
        <div>
          <label>Nombre del Workspace:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='P.Ej.: Monstruos Alienigenas'
            maxLength="20"
          />
        </div>
        <div>
          <label>Canal:</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
            maxLength="20"
          />
        </div>
        <div className='botones'>
          <button type="submit">Agregar Workspace</button>
          <Link to="/">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

export default NewWorkspace;
