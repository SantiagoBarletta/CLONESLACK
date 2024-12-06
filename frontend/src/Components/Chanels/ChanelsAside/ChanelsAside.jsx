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
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchWorkspaceDetails = async () => {
      setIsLoading(true);
      try {
          const response = await fetch(`${import.meta.env.VITE_URL_API}/api/workspaces/${workspaceID}`, {
              headers: {
                  Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
              },
          });
  
          if (!response.ok) throw new Error("Error al obtener los detalles del workspace");
  
          const data = await response.json();
          setWorkspace(data.data);
          setWorkspaceName(data.data.name);
          setChannels(data.data.channels);
          setUsers(data.data.users);
      } catch (error) {
          console.error("Error:", error);
          setWorkspaceName("Error al cargar workspace");
      }
      finally {
        setIsLoading(false);
    }
      
  };
  

    fetchWorkspaceDetails();
}, [workspaceID]);

return (
  <div className="chanels-aside">
      {isLoading ? (
          <p>Cargando...</p>
      ) : (<>
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
                <img src={user.foto_perfil} className='member'/>
                <p key={index}>{user.username}</p>
              </div>
            ))}
            <p>{users.length} miembros</p>
          </>
        ) : (
          <p>No hay miembros en este workspace</p>
        )}
      </div></>)}
      </div>
  );
}

export default ChanelsAside;
