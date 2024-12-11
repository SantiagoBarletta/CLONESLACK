import React, { useState, useEffect } from "react";
import { ChanelsHeader, Chanels, ChanelsAside } from "../../Components";
import "./ChanelsScreen.css";

function ChanelsScreens() {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewInfo, setViewInfo] = useState('');
  const [isAsideVisible, setIsAsideVisible] = useState(window.innerWidth > 768);
  const [showPrivateMessages, setShowPrivateMessages] = useState(false); // Estado para mensajes privados

  const toggleAside = () => {
    setIsAsideVisible(prevState => !prevState);
  };

  const closeAside = () => {
    setIsAsideVisible(false);
  };

  const handleSendMessage = () => {
    setShowPrivateMessages(true); // Cambiar a vista de mensajes privados
  };

  const handleClosePrivateMessages = () => {
    setShowPrivateMessages(false); // Volver a vista normal
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsAsideVisible(true);
      } else if (!isAsideVisible) {
        setIsAsideVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isAsideVisible]);

  return (
    <div className="chanels-screens">
      <ChanelsHeader search={search} setSearch={setSearch} toggleAside={toggleAside} />
      <main className="chanels-main">
        {isAsideVisible && (
          <ChanelsAside 
            onSelectUser={setSelectedUser} 
            viewInfo={viewInfo} 
            setViewInfo={setViewInfo} 
            onClose={closeAside}
          />
        )}
<Chanels
  search={search}
  selectedUser={selectedUser}
  viewInfo={viewInfo}
  setViewInfo={setViewInfo}
  showPrivateMessages={showPrivateMessages} // Pasar como prop
  onSendMessage={handleSendMessage} // Pasar la función para activar mensajes privados
  onClosePrivateMessages={handleClosePrivateMessages} // Pasar la función para cerrar mensajes privados
/>


      </main>
    </div>
  );
}

export default ChanelsScreens;
