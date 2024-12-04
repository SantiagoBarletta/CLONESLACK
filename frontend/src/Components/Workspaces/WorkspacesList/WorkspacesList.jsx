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
    const fetchWorkspaces = async () => {
      try {
        setIsLoading(true); // Muestra el estado de carga
        const data = await obtenerWorkspaces();
        console.log("Workspaces desde backend", data);
  
        if (data && Array.isArray(data.workspaces)) {
          setWorkspaces(data.workspaces); // Actualiza el estado
          localStorage.setItem('workspaces', JSON.stringify(data.workspaces)); // Guarda en localStorage
        } else {
          setWorkspaces([]); // Si no hay datos, muestra la lista vacía
        }
      } catch (error) {
        console.error("Error al obtener workspaces:", error);
        setError("Error al cargar los espacios de trabajo.");
      } finally {
        setIsLoading(false); // Detiene el estado de carga
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
