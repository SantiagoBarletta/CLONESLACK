import React from 'react';
import './FormBusquedaMensajes.css';

function FormBusquedaMensajes({ search, onSearchChange }) {
  const handleChange = (e) => {
    if (typeof onSearchChange === 'function') {
      onSearchChange(e.target.value);
    }
  }

  return (
    <form className="form-busqueda">
      <input
        type="text"
        placeholder="Buscar..."
        onChange={handleChange}
        value={search}
      />
    </form>
  );
}

export default FormBusquedaMensajes;
