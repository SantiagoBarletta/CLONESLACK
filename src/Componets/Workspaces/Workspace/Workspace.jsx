import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import "./Workspace.css";

function Workspace({ workspace }) {
  const { id, name, image, users, channels } = workspace;

  const firstChannel =  channels[0];

  return (
    <Link className="workspaces-link" to={ `/workspaces/${id}/${firstChannel.id}` }>
      <div key={id} className="workspace-item">
        <img src={image} alt={name} />
        <div className="datos">
          <p className="name">{name}</p>
          <p className="members">
            {users.map((user, index) => (
              <img className="member" key={index} src={user.profile_image} alt={user.username} />
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
