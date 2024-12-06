import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import "./Workspace.css";

function Workspace({ workspace }) {
  const { id, name, image, users = [], channels = [] } = workspace;

  if (channels.length === 0) {
    return (
      <div className="workspace-item">
        <p>Este workspace no tiene canales disponibles.</p>
      </div>
    );
  }

  const firstChannel = channels[0];
  return (
    <Link className="workspaces-link" to={`/workspaces/${id}/${firstChannel.id}`}>
      <div key={id} className="workspace-item">
        <img src={image || "/path/to/default-image.jpg"} alt={name} />
        <div className="datos">
          <p className="name">{name}</p>
          <p className="members">
            {users.map((user, index) => (
              <img className="member" key={index} src={user.foto_perfil || "/path/to/default-user.jpg"} alt={user.name} />
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
