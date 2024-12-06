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
        const fetchChannelData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL_API}/api/workspaces/${workspaceID}/channels/${channelID}/messages`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
                    },
                });
    
                if (!response.ok) throw new Error("Error al obtener los datos del canal");
    
                const { data } = await response.json();
    
                if (data.length > 0) {
                    setChannelName(data[0].channel_name || "Canal desconocido");
                    setMessages(data);
                } else {
                    setChannelName("Canal desconocido");
                    setMessages([]);
                }
            } catch (error) {
                console.error("Error al obtener datos del canal:", error);
            }
        };
    
        fetchChannelData();
    }, [workspaceID, channelID]);
    
  

    const handleNewMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
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
            <h2># {channelName || "Canal desconocido"} <IoIosArrowDown className='arrow' /></h2>

            </div>
            <main className="messages container">
                {selectedUser && <UserInfo user={selectedUser} workspaceID={workspaceID} channelID={channelID} className={viewInfo} viewInfo={viewInfo} setViewInfo={setViewInfo}/>}
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
                                <button className="delete-button"><FaTrash /></button>
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
