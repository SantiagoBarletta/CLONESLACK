import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewWorkspace.css';

function NewWorkspace() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && description) {
      try {
        const token = sessionStorage.getItem("access-token");
  
        const response = await fetch(import.meta.env.VITE_URL_API + "/api/workspaces", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description: `${description} (Creado por ${sessionStorage.getItem("username")})`,
            image: "/Imagenes/default-image.png",
            token,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Error al crear el workspace");
        }
  
        alert("Workspace creado con éxito");
        window.location.href = "/";
      } catch (error) {
        alert("Error al crear el workspace: " + error.message);
      }
    }
  };
  
  

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
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
