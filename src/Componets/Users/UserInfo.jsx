import React, { useState } from 'react';
import { MdOutlineMail, MdClose } from "react-icons/md";

import './UserInfo.css';

const UserInfo = ({ user, viewInfo, setViewInfo }) => {

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={viewInfo}>
      <div className="close"> <MdClose className="arrow" onClick={() => setViewInfo('infoContainer-none')} /> </div>

      <div className="bioInfo">
        <img src={user.profile_image || ''} alt={user.username} className="userImage" />
        <div className="contact-info">
          <div className="contact-name">{user.firstname} {user.lastname}</div>

        </div>


      </div>
      <div className="userInfo">
        <h3>Información de contácto</h3>
        <div className="contact"><MdOutlineMail className='icon'/>
          <div className='correo'>
            <p><strong>Dirección de Correo</strong></p><p>{user.email}</p>
          </div>
        </div>
      </div>

    </div >

  );
}

export default UserInfo;
