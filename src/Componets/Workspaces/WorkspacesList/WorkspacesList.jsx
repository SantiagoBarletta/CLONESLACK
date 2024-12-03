import React, { useState, useEffect } from "react";
import { Workspace } from "../..";
import "./WorkspacesList.css";
import obtenerWorkspaces from "../../../Fetching/workspaces.fetching";
import { Link } from "react-router-dom";

function WorkspacesList() {
  const [workspaces, setWorkspaces] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedWorkspaces = localStorage.getItem('workspaces');
    if (storedWorkspaces) {
      setWorkspaces(JSON.parse(storedWorkspaces));
      console.log("workspaces desde localStorage", JSON.parse(storedWorkspaces));
      setIsLoading(false);
    } else {
      obtenerWorkspaces()
        .then((data) => {
          console.log("workspaces desde fetch", data);
          if (data && Array.isArray(data.workspaces)) {
            setWorkspaces(data.workspaces);
            localStorage.setItem('workspaces', JSON.stringify(data.workspaces));
            setIsLoading(false);
          } 
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <>
      <div className="workspace-list">
        <div className="title"><h4>Espacios de trabajo</h4></div>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          workspaces.length > 0 ? (
            workspaces.map((workspace) => (
              <Workspace key={workspace.id} workspace={workspace} />
            ))
          ) : (
            <p>No hay workspaces disponibles.</p>
          )
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
