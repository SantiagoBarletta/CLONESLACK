import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './NewChannel.css';

const NewChannel = () => {
  const { workspaceID } = useParams();
  const [channelName, setChannelName] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [newChannelId, setNewChannelId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (channelName) {
      const storedWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
      const workspaceEncontrado = storedWorkspaces.find(ws => ws.id === workspaceID);

      if (workspaceEncontrado) {
        let highestChannelIdNumber = 0;
        workspaceEncontrado.channels.forEach(channel => {
          const channelIdNumber = parseInt(channel.id.substring(3));
          if (channelIdNumber > highestChannelIdNumber) {
            highestChannelIdNumber = channelIdNumber;
          }
        });
        const newChannelId = `C00${highestChannelIdNumber + 1}`;
        setNewChannelId(newChannelId);


        const newChannel = {
          id: newChannelId,
          name: channelName,
          messages: []
        };

        workspaceEncontrado.channels.push(newChannel);
        localStorage.setItem('workspaces', JSON.stringify(storedWorkspaces));
        setRedirect(true);
      }
    }
  };

  const navegar = useNavigate();

  const handleAtras = () => {
    navegar(-1);
  };

  useEffect(() => {
    if (redirect) {
      window.location.href = `/workspaces/${workspaceID}/${newChannelId}`;
    }
  }, [redirect, workspaceID, newChannelId]);

  return (
    <div className='main-container-new-channel'>
      <div className='new-channel-container'>
        <form onSubmit={handleSubmit} className='form-new-channel'>
          <div>
            <label>Nombre del Canal:</label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              required
              placeholder='P.Ej.: General'
              maxLength="20"
            />
          </div>
          <p className='ayuda'>Los canales son el lugar donde se producen las conversaciones sobre un tema.
            <br />Usa un nombre que sea fácil de encontrar y comprender.</p>
          <div className='botones'>
            <button type="submit">Crear Canal</button>
            <Link onClick={handleAtras}>Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChannel;
