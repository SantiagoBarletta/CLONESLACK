import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import "./PrivateMessages.css";

const PrivateMessages = ({ selectedUser, workspaceID, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
          const token = sessionStorage.getItem("access-token");
          const response = await fetch(
              `${import.meta.env.VITE_URL_API}/api/private-messages/${selectedUser.id}`,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
  
          if (!response.ok) {
              const errorData = await response.json();
              console.error("Error del servidor:", errorData);
              throw new Error("Error al obtener mensajes privados");
          }
  
          const { messages } = await response.json();
          setMessages(messages);
      } catch (error) {
          console.error("Error al cargar mensajes privados:", error);
      } finally {
          setIsLoading(false);
      }
  };
  
    fetchMessages();
  }, [selectedUser.id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
        const token = sessionStorage.getItem("access-token");
        const response = await fetch(
            `${import.meta.env.VITE_URL_API}/api/private-messages`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    receiver_id: selectedUser.id,
                    text: newMessage,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error del servidor:", errorData);
            throw new Error("Error al enviar mensaje privado");
        }

        const { message } = await response.json();

        // Agrega el mensaje al estado
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage("");
    } catch (error) {
        console.error("Error al enviar mensaje privado:", error);
    }
};


  return (
    <div className="private-messages">
      <div className="pm-header">
        <h2>Mensajes Privados con {selectedUser.username}</h2>
        <button className="pm-close-button" onClick={onClose}>
          <MdClose />
        </button>
      </div>
      <div className="pm-message-container">
    {messages.map((msg, index) => {
        const isDifferentSender =
            index === 0 || msg.sender_id !== messages[index - 1].sender_id;

        return (
            <div key={msg.id} className="pm-message">
                {isDifferentSender && ( // Mostrar encabezado solo si cambia el emisor
                    <div className="pm-message-header">
                        <img
                            className="sender-image"
                            src={msg.sender_image || "/Imagenes/user.png"}
                            alt={msg.sender_name || "Usuario"}
                        />
                        <span className="sender-name">{msg.sender_name || "Usuario"}</span>
                        <span className="message-time">
                            {msg.date
                                ? new Date(msg.date).toLocaleTimeString("es-ES", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                  })
                                : "Hora no disponible"}
                        </span>
                    </div>
                )}
                <div className="pm-message-text">{msg.text || "Mensaje no disponible"}</div>
            </div>
        );
    })}
</div>


<form
    className="pm-new-message-form"
    onSubmit={(e) => {
        e.preventDefault(); 
        handleSendMessage(e); 
    }}
>
    <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        rows="3"
        onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { 
                e.preventDefault(); 
                handleSendMessage(e); 
            }
        }}
    ></textarea>
    <button type="submit">Enviar</button>
</form>


    </div>
  );
};

export default PrivateMessages;
