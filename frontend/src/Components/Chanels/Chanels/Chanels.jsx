import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chanels.css";
import { IoIosArrowDown } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import NuevoMensajeForm from "../MensajeForm/NuevoMensajeForm";
import UserInfo from "../../Users/UserInfo";
import EditProfile from "../../Users/EditProfile";
import PrivateMessages from "../../Users/PrivateMessages";

const Chanels = ({
  search,
  selectedUser,
  viewInfo,
  setViewInfo,
  showPrivateMessages,
  onSendMessage,
  onClosePrivateMessages,
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

  return (
    <div className="channel">
      <div className="messages-header">
        <h2>
          # {channelName || "Canal desconocido"} <IoIosArrowDown className="arrow" />
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
          onSendMessage={onSendMessage} // Aquí propagamos correctamente la función
        />
        
        )}
        {selectedUser && showEditProfile && (
          <EditProfile onCloseEdit={() => setShowEditProfile(false)} />
        )}
        {selectedUser && showPrivateMessages && (
          <PrivateMessages
            selectedUser={selectedUser}
            workspaceID={workspaceID}
            onClose={onClosePrivateMessages} // Cerrar mensajes privados
          />
        )}
        {/* Mensajes del canal (si no estamos viendo perfil ni mensajes privados) */}
        {!selectedUser && (
          <div className="messages">
            {isLoading ? (
              <p>Cargando...</p>
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
                    <p className="message-text">{message.text}</p>
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
        )}
      </main>
    </div>
  );
};


export default Chanels;
