import React, { useContext } from "react";
import useForm from "@hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./LoginScreen.css";

const LoginScreen = () => {
  const { formState, handleChange } = useForm({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext); // Usa el contexto
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
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
        // Manejar errores específicos
        if (data.code === "USER_NOT_FOUND") {
          alert("Usuario no encontrado");
        } else if (data.code === "INCORRECT_PASSWORD") {
          alert("Contraseña incorrecta");
        } else if (data.code === "EMAIL_NOT_VERIFIED") {
          alert("Verifica tu cuenta antes de iniciar sesión");
        } else {
          alert("Error inesperado. Inténtalo más tarde.");
        }
      } else {
        // Login exitoso
        login(data.data.accessToken);
        sessionStorage.setItem("userName", data.data.user_info.name);
      }
    } catch (error) {
      console.error("Error en el proceso de login:", error);
      alert("Error de conexión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Inicia sesión en Slasher</h1>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Introduce tu correo"
          required
          onChange={handleChange}
          value={formState.email}
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
        <button type="submit">Iniciar sesión</button>
        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
      </form>
      <Link to="/register" className="register-link">
        ¿No tienes cuenta? Regístrate
      </Link>
    </div>
  );
};

export default LoginScreen;
