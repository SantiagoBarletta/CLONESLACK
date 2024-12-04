import React, { useState } from "react";
import useForm from "@hooks/useForm";
import { useNavigate } from "react-router-dom";
import "./Users.css";

const Register = () => {
  const navigate = useNavigate();

  const { formState, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  });

  const handleRegister = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(import.meta.env.VITE_URL_API + "/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
  
      const data = await response.json();

      if (!response.ok) {
        // Manejar errores específicos
        console.error("Error en la API:", data);
        setErrorState({
          name: "",
          email: data.code === "DUPLICATE_ERROR" ? data.message : "",
          password: "",
          general: data.message || "Error desconocido",
        });
        return;
      }

      // Registro exitoso
      setErrorState({
        name: "",
        email: "",
        password: "",
        general: "",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error al procesar el registro:", error);
      setErrorState({
        name: "",
        email: "",
        password: "",
        general: "Error al procesar el registro. Intenta más tarde.",
      });
    }
  };

  

  return (
    <div className="register-container">
      <h1>Regístrate</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
        />
        {errorState.name && <p className="error-message">{errorState.name}</p>}
        <label>Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        {errorState.email && <p className="error-message">{errorState.email}</p>}
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          required
        />
        {errorState.password && <p className="error-message">{errorState.password}</p>}
        <button type="submit">Registrar</button>
        
      </form>
    </div>
  );
};

export default Register;
