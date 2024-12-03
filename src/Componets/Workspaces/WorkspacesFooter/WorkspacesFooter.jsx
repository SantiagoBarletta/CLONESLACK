import React from 'react';
import './WorkspacesFooter.css';
import { Link } from 'react-router-dom';
import { TbWorld } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

const WorkspacesFooter = () => {
    return (
        <div className="workspaces-footer">
            <p>¿No encuentras tu espacio de trabajo?</p>
            <Link to="#" className='link'>Probar con otra dirección</Link>
            <div className='menu-footer'><ul><li>Privacidad y términos</li>
            <li>Contactarnos</li>
            <li><TbWorld className='mundo'/> Cambiar región <IoIosArrowDown className='arrow'/></li></ul></div>
        </div>
    );
};

export default WorkspacesFooter;