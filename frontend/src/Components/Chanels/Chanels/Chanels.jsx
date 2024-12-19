import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chanels.css";
import { IoIosArrowDown } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import NuevoMensajeForm from "../MensajeForm/NuevoMensajeForm";
import UserInfo from "../../Users/UserInfo/UserInfo";
import PrivateMessages from "../../Users/PrivateMessages/PrivateMessages";
import EditProfile from "../../Users/EditProfile/EditProfile";

const Chanels = ({
  search,
  selectedUser,
  viewInfo,
  setViewInfo,
  showPrivateMessages,
  setShowPrivateMessages, 
}) => {
  const { workspaceID, channelID } = useParams();
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false); 

  useEffect(() => {
    const fetchChannelData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_URL_API
          }/api/workspaces/${workspaceID}/channels/${channelID}/messages`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
            },
          }
        );

        if (!response.ok)
          throw new Error("Error al obtener los datos del canal");

        const { data } = await response.json();

        if (data.length > 0) {
          setChannelName(data[0].channel_name || "Canal desconocido");
          setMessages(data.filter((msg) => msg.id));
        } else {
          setChannelName(data[0]?.channel_name || "Canal desconocido");
          setMessages([]);
        }
      } catch (error) {
        console.error("Error al obtener datos del canal:", error);
        setChannelName("Error al cargar canal");
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannelData();
  }, [workspaceID, channelID]);

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleDeleteMessage = async (messageID) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/api/workspaces/messages/${messageID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
          },
        }
      );

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: await response.text() };
        }
        if (response.status === 403) {
          alert("No puedes eliminar mensajes de otros usuarios");
        }
        throw new Error(errorData.message || "Error al eliminar el mensaje");
      }

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageID)
      );
    } catch (error) {
      console.error("Error al eliminar el mensaje:", error);
    }
  };

  const resaltarBusqueda = (message, busqueda) => {
    if (!busqueda) return message;
  
    const letras = message.split(new RegExp(`(${busqueda})`, "gi"));
    return letras.map((letra, index) =>
      letra.toLowerCase() === busqueda.toLowerCase() ? (
        <span
          key={index}
          style={{ backgroundColor: "yellow", color: "black" }}
        >
          {letra}
        </span>
      ) : (
        letra
      )
    );
  };
  return (
    <div className="channel">
      <div className="messages-header">
        <h2>
          # {channelName || "Canal desconocido"}{" "}
          <IoIosArrowDown className="arrow" />
        </h2>
      </div>
      <main className="messages container">
        {selectedUser && !showEditProfile && !showPrivateMessages && (
          <UserInfo
            user={selectedUser}
            workspaceID={workspaceID}
            channelID={channelID}
            className={viewInfo}
            viewInfo={viewInfo}
            setViewInfo={setViewInfo}
            onEditProfile={() => setShowEditProfile(true)}
            onSendMessage={() => setShowPrivateMessages(true)} 
          />
        )}
        {selectedUser && showEditProfile && (
          <EditProfile onCloseEdit={() => setShowEditProfile(false)} />
        )}
        {selectedUser && showPrivateMessages && (
          <PrivateMessages
            selectedUser={selectedUser}
            workspaceID={workspaceID}
            onClose={() => setShowPrivateMessages(false)} 
          />
        )}
        <div className="messages">
          {isLoading ? (
            <img src="/Imagenes/loading.gif" alt="Cargando..."/>
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="message">
                <img
                  src={message.author_image}
                  alt={message.author_name}
                  className="avatar"
                />
                <div className="message-content">
                  <p>
                    <strong>{message.author_fullname}</strong>{" "}
                    <span className="message-date">
                      {new Date(message.date).toLocaleString()}
                    </span>
                  </p>
                  <p className="message-text">
                  {resaltarBusqueda(message.text, search)}
                </p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteMessage(message.id)}
                >
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
