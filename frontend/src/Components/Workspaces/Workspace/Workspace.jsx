import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import "./Workspace.css";

function Workspace({ workspace }) {
  const { id, nombre, image, users, channels } = workspace;

  const firstChannel = channels?.[0];

  if (!firstChannel) {
    return (
      <div className="workspace-item">
        <p>Este workspace no tiene canales disponibles.</p>
      </div>
    );
  }

  return (
    <Link className="workspaces-link" to={`/workspaces/${id}/${firstChannel.id}`}>
      <div key={id} className="workspace-item">
        <img src={image} alt={nombre} />
        <div className="datos">
          <p className="name">{nombre}</p>
          <p className="members">
            {users.map((user, index) => (
              <img className="member" key={index} src={user.foto_perfil} alt={user.username} />
            ))}
            {users.length} miembros
          </p>
        </div>
        <div className="flecha"><FaArrowRight /></div>
      </div>
    </Link>
  );
}

export default Workspace;
