import React, { useContext, useState } from "react";
import useForm from "@hooks/useForm";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Users.css";

const Login = () => {
  const { formState, handleChange } = useForm({
    login: "", 
    password: "",
  });
  const { login } = useContext(AuthContext); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch(
        import.meta.env.VITE_URL_API + "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      const data = await response.json();

      if (!data.ok) {
        if (data.code === "USER_NOT_FOUND") {
          setErrorMessage("Usuario no encontrado");
        } else if (data.code === "INCORRECT_PASSWORD") {
          setErrorMessage("Contraseña incorrecta");
        } else if (data.code === "EMAIL_NOT_VERIFIED") {
          setErrorMessage("Verifica tu cuenta antes de iniciar sesión");
        } else {
          setErrorMessage("Error inesperado. Inténtalo más tarde.");
        }
      } else {
        login(data.data.accessToken);
        sessionStorage.setItem("userName", data.data.user_info.username);
      }
    } catch (error) {
      console.error("Error en el proceso de login:", error);
      setErrorMessage("Error de conexión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Inicia sesión en Slasher</h1>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="login">Correo electrónico o nombre de usuario</label>
        <input
          type="text"
          id="login"
          name="login"
          placeholder="Introduce tu correo o nombre de usuario"
          required
          onChange={handleChange}
          value={formState.login}
        />
        
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Introduce tu contraseña"
          required
          onChange={handleChange}
          value={formState.password}
        />
        {errorMessage && (<span className="error-message">{errorMessage}</span>)}
        <button type="submit">Iniciar sesión</button>
        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
      </form>
      <Link to="/register" className="register-link">
        ¿No tienes cuenta? Regístrate
      </Link>
    </div>
  );
};

export default Login;
