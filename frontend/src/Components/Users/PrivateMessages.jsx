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
        console.log("Token:", token); // Depuración
    
        const response = await fetch(
          `${import.meta.env.VITE_URL_API}/api/private-messages/${selectedUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
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
      console.log("Token:", token); // Depuración
  
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/api/private-messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
          },
          body: JSON.stringify({
            sender_id: JSON.parse(atob(sessionStorage.getItem("access-token").split(".")[1])).user_id,
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
      setMessages((prev) => [...prev, message]);
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
      <div className="pm-messages-container">
        {isLoading ? (
          <p>Cargando...</p>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className={`pm-message ${msg.sender_id === selectedUser.id ? "received" : "sent"}`}>
            <p>{msg.text}</p>
            <span>{new Date(msg.date).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" })}</span>
          </div>
          
          ))
        ) : (
          <p>No hay mensajes</p>
        )}
      </div>
      <form className="pm-new-message-form" onSubmit={handleSendMessage}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          rows="3"
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default PrivateMessages;
