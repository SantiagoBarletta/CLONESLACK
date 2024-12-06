import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './NuevoMensajeForm.css';
import { IoMdSend } from "react-icons/io";

const NuevoMensajeForm = ({ onNewMessage }) => {
  const { workspaceID, channelID } = useParams();
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(
            `${import.meta.env.VITE_URL_API}/api/workspaces/${workspaceID}/channels/${channelID}/messages`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
                },
                body: JSON.stringify({ text }),
            }
        );

        if (!response.ok) throw new Error("Error al enviar el mensaje");

        const newMessage = await response.json();
        onNewMessage(newMessage.data);
        setText("");
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
    }
};


  return (
    <div>
      <form onSubmit={handleSubmit} className='new-message-form'>
        <textarea 
          maxLength={250}
          className='input-new-message'
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu mensaje..."
          required
        />
        <button type="submit" className='button-new-message'><IoMdSend/></button>
      </form>
    </div>
  );
};

export default NuevoMensajeForm;
