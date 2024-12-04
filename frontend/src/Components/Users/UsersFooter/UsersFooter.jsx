import React from 'react';
import './UsersFooter.css';

import { TbWorld } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

const UsersFooter = () => {
    return (
        <div className="workspaces-footer">
            
            <div className='menu-footer'><ul><li>Privacidad y términos</li>
            <li>Contactarnos</li>
            <li><TbWorld className='mundo'/> Cambiar región <IoIosArrowDown className='arrow'/></li></ul></div>
        </div>
    );
};

export default UsersFooter;