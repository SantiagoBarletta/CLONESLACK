import React, { useState, useEffect } from "react";
import { Workspace } from "../..";
import "./WorkspacesList.css";
import { Link } from "react-router-dom";

function WorkspacesList() {
  const [workspaces, setWorkspaces] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(import.meta.env.VITE_URL_API + "/api/workspaces", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los espacios de trabajo");
        }

        const data = await response.json();
        setWorkspaces(data.workspaces);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <>
      <div className="workspace-list">
        <div className="title"><h4>Espacios de trabajo</h4></div>
        {isLoading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : workspaces.length > 0 ? (
          workspaces.map((workspace) => (
            <Workspace key={workspace.id} workspace={workspace} />
          ))
        ) : (
          <p>No hay workspaces disponibles.</p>
        )}
      </div>
      <div className="workspaces-add">
        <img src="Imagenes/jasonicon.png" alt="logo" />
        <p>¿Quieres usar Slasher con otro equipo?</p>
        <Link to="/workspaces/new"><button>Crear otro espacio de trabajo</button></Link>
      </div>
    </>
  );
}

export default WorkspacesList;
