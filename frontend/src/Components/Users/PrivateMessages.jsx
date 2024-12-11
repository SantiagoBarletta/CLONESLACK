import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";
import "./PrivateMessages.css";

const PrivateMessages = () => {
    const { workspaceID, userID } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_URL_API}/api/private-messages/${userID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
                        },
                    }
                );
                if (!response.ok) throw new Error("Error al obtener mensajes");
                const { messages } = await response.json();
                setMessages(messages);
            } catch (error) {
                console.error("Error al cargar mensajes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, [userID]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
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
                        receiver_id: userID,
                        text: newMessage,
                    }),
                }
            );
            if (!response.ok) throw new Error("Error al enviar mensaje");
            const { message } = await response.json();
            setMessages((prev) => [...prev, message]);
            setNewMessage("");
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
        }
    };

    return (
        <div className="private-messages">
                        <div className="close">
                <MdClose
                    className="arrow"
                    onClick={() => setViewInfo("private-messages-none")}
                />
            </div>

            <h2>Mensajes Privados</h2>
            <div className="messages-container">
                {isLoading ? (
                    <p>Cargando...</p>
                ) : messages.length > 0 ? (
                    messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.sender_id === userID ? "received" : "sent"}`}>
                            <p>{msg.text}</p>
                            <span>{new Date(msg.date).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <p>No hay mensajes</p>
                )}
            </div>
            <div className="new-message">
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
                <button onClick={handleSendMessage}>Enviar</button>
            </div>
        </div>
    );
};

export default PrivateMessages;
