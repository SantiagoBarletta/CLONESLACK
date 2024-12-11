import React, { useState } from "react";
import useForm from "@hooks/useForm";
import { useNavigate } from "react-router-dom";
import "./Users.css";

const Register = () => {
  const navigate = useNavigate();

  const { formState, handleChange } = useForm({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    firstname: "",
    lastname: "",
    username: "",
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
        console.error("Error en la API:", data);
        setErrorState({
          firstname: "",
          lastname: "",
          username: data.code === "DUPLICATE_ERROR" && data.message.includes("username") ? data.message : "",
          email: data.code === "DUPLICATE_ERROR" && data.message.includes("email") ? data.message : "",
          password: "",
          general: data.message || "Error desconocido",
        });
        return;
      }

      setErrorState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        general: "",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error al procesar el registro:", error);
      setErrorState({
        firstname: "",
        lastname: "",
        username: "",
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
          name="firstname"
          value={formState.firstname}
          onChange={handleChange}
          required
        />
        {errorState.firstname && <p className="error-message">{errorState.firstname}</p>}
        
        <label>Apellido</label>
        <input
          type="text"
          name="lastname"
          value={formState.lastname}
          onChange={handleChange}
          required
        />
        {errorState.lastname && <p className="error-message">{errorState.lastname}</p>}
        
        <label>Nombre de Usuario</label>
        <input
          type="text"
          name="username"
          value={formState.username}
          onChange={handleChange}
          required
        />
        {errorState.username && <p className="error-message">{errorState.username}</p>}
        
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
        {errorState.general && <p className="error-message">{errorState.general}</p>}
      </form>
    </div>
  );
};

export default Register;
