import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./ChanelsAside.css";
import { IoIosArrowDown } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaTimes } from 'react-icons/fa'

const ChanelsAside = ({ onSelectUser, viewInfo, setViewInfo, onClose  }) => {
  const { workspaceID, channelID } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState([]);
  const [workspaceName, setWorkspaceName] = useState('');
  
  useEffect(() => {
    const storedWorkspaces = localStorage.getItem('workspaces');
    
    if (storedWorkspaces) {
      const workspaces = JSON.parse(storedWorkspaces);
      const workspaceEncontrado = workspaces.find(ws => ws.id === workspaceID);
      if (workspaceEncontrado) {
        setWorkspace(workspaceEncontrado);
        setWorkspaceName(workspaceEncontrado.name);
        setChannels(workspaceEncontrado.channels);
        setUsers(workspaceEncontrado.users);
      }
    } 
  }, [workspaceID]);

  return (
    <div className="chanels-aside">
      <h2>{workspaceName} <IoIosArrowDown className='arrow'  /><button className="close-button" onClick={onClose}>
        <FaTimes />
      </button></h2>
      
      
      <div className="channels">
        <h3><TiArrowSortedDown className='arrow'/>Canales</h3>
        {channels.map((channel) => (
            <Link key={channel.id} to={`/workspaces/${workspaceID}/${channel.id}`} className='link'>
            <p key={channel.id}># {channel.name}</p></Link>
          ))
        }
        <div className="create-channel">
          <Link to={`/workspaces/${workspaceID}/new-channel`} className='link'>
            <p>Crear canal</p>
          </Link>
        </div>
      </div>
      <div className="members">
        <h3><TiArrowSortedDown className='arrow'/>Miembros</h3>
        {users.length > 0 ? (
          <>
            {users.map((user, index) => (
              <div key={index} onClick={() => { setViewInfo('infoContainer'); onSelectUser(user); }} className='link' >
                <img src={user.profile_image} className='member'/>
                <p key={index}>{user.username}</p>
              </div>
            ))}
            <p>{users.length} miembros</p>
          </>
        ) : (
          <p>No hay miembros en este workspace</p>
        )}
      </div>
    </div>
  );
}

export default ChanelsAside;
