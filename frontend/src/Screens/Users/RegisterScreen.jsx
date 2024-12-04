import React, { useState } from "react";
import useForm from "@hooks/useForm";
import { useNavigate } from "react-router-dom";
import "./RegisterScreen.css";

const RegisterScreen = () => {
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
  
      if (!response.ok) {
        const errorText = await response.text(); // Captura la respuesta como texto para mayor claridad
        console.error("Error en la API:", errorText); // Log detallado del error
        throw new Error(errorText || "Error desconocido");
      }
  
      const data = await response.json();
      if (!data.ok) {
        setErrorState({
          name: "",
          email: "",
          password: "",
          general: data.message || "Error desconocido",
        });
      } else {
        setErrorState({
          name: "",
          email: "",
          password: "",
          general: "",
        });
        navigate("/login");
      }
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
        <label>Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
        {errorState.general && <p className="error-message">{errorState.general}</p>}
      </form>
    </div>
  );
};

export default RegisterScreen;
