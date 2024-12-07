import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './NewChannel.css';
import { useNavigate } from 'react-router-dom';

const NewChannel = () => {
  const { workspaceID } = useParams();
  const [channelName, setChannelName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelName) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/api/workspaces/${workspaceID}/channels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: channelName }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al crear el canal");
      }

      const data = await response.json();
      alert("Canal creado con éxito");
      window.location.href = `/workspaces/${workspaceID}/${data.data.id}`;
    } catch (error) {
      setError(error.message);
    }
  };

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
          {error && <p className='error'>{error}</p>}
          <div className='botones'>
            <button type="submit">Crear Canal</button>
            <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChannel;
