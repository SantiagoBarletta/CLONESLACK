import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chanels.css';
import { IoIosArrowDown } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import NuevoMensajeForm from '../MensajeForm/NuevoMensajeForm';
import UserInfo from '../../Users/UserInfo';

const Chanels = ({ search, selectedUser, viewInfo, setViewInfo }) => {
  const { workspaceID, channelID } = useParams();
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const storedWorkspaces = localStorage.getItem('workspaces');

    if (storedWorkspaces) {
      const workspaces = JSON.parse(storedWorkspaces);
      const foundWorkspace = workspaces.find(ws => ws.id === workspaceID);
      if (foundWorkspace) {
        const foundChannel = foundWorkspace.channels.find(ch => ch.id === channelID);
        if (foundChannel) {
          setMessages(foundChannel.messages || []);
          setChannelName(foundChannel.name);
        }
      }
      setIsLoading(false);
    } else {
      obtenerWorkspaces()
        .then((data) => {
          if (data && Array.isArray(data.workspaces)) {
            localStorage.setItem('workspaces', JSON.stringify(data.workspaces));
            const foundWorkspace = data.workspaces.find(ws => ws.id === workspaceID);
            if (foundWorkspace) {
              const foundChannel = foundWorkspace.channels.find(ch => ch.id === channelID);
              if (foundChannel) {
                setMessages(foundChannel.messages || []);
                setChannelName(foundChannel.name);
              }
            }
          }
        })
    }
  }, [workspaceID, channelID]);

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleDeleteMessage = (messageId) => {
    const storedWorkspaces = JSON.parse(localStorage.getItem('workspaces'));
    const foundWorkspace = storedWorkspaces.find(ws => ws.id === workspaceID);
    if (foundWorkspace) {
      const foundChannel = foundWorkspace.channels.find(ch => ch.id === channelID);
      if (foundChannel) {
        const updatedMessages = foundChannel.messages.filter(message => message.id !== messageId);
        foundChannel.messages = updatedMessages;
        localStorage.setItem('workspaces', JSON.stringify(storedWorkspaces));
        setMessages(updatedMessages);
      }
    }
  };

  const resaltarBusqueda = (message, busqueda) => {
    if (!busqueda) return message;

    const letras = message.split(new RegExp(`(${busqueda})`, 'gi'));
    return letras.map((letra, index) =>
      letra.toLowerCase() === busqueda.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow', color: 'black' }}>{letra}</span>
      ) : (
        letra
      )
    );
  };

  return (
    <div className='channel'>
      <div className='messages-header'>
        <h2># {channelName} <IoIosArrowDown className='arrow' /></h2>
      </div>
      <main className="messages container">
      { selectedUser && <UserInfo user={selectedUser} workspaceID={workspaceID} channelID={channelID} className={viewInfo} viewInfo={viewInfo} setViewInfo={setViewInfo}/>}
      <div className="messages" >
        {isLoading ? (
          <p>Cargando...</p>
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="message">
              
              <img src={message.author_image} alt={message.author} className='avatar' />
              <div className="message-content">
                <p><strong>{message.author}</strong> <span className="message-date">{new Date(message.date).toLocaleString()}</span></p>
                <p className="message-text">{resaltarBusqueda(message.text, search)}</p>
              </div>
              <button onClick={() => handleDeleteMessage(message.id)} className="delete-button">
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="no-messages">No hay mensajes en este canal</p>
        )}
      </div>
      </main>
      <NuevoMensajeForm onNewMessage={handleNewMessage} />
      
    </div>
  );
};

export default Chanels;
