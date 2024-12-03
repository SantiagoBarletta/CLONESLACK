import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './NuevoMensajeForm.css';
import { IoMdSend } from "react-icons/io";

const NuevoMensajeForm = ({ onNewMessage }) => {
  const { workspaceID, channelID } = useParams();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim()) {
      const storedWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
      const foundWorkspace = storedWorkspaces.find(ws => ws.id === workspaceID);

      if (foundWorkspace) {
        const foundChannel = foundWorkspace.channels.find(ch => ch.id === channelID);

        if (foundChannel) {
          
          const newMessageId = foundChannel.messages && foundChannel.messages.length 
            ? `M00${parseInt(foundChannel.messages[foundChannel.messages.length - 1].id.substring(3)) + 1}` : 'M001';

          const newMessage = {
            id: newMessageId,
            author: 'Yo',
            author_image: '/Imagenes/default-image.png', 
            date: new Date().toISOString(),
            text: text.trim(),
          };

          
          if (!foundChannel.messages) {foundChannel.messages = [];}

          foundChannel.messages.push(newMessage);
          localStorage.setItem('workspaces', JSON.stringify(storedWorkspaces));
          onNewMessage(newMessage);
          setText('');
        }
      }
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
