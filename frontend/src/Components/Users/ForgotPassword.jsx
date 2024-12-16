import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form";
import "./Users.css";

const ForgotPassword = () => {
  const form_fields = [
    {
      label_text: "Correo electrónico",
      field_component: "INPUT",
      field_container_props: {
        className: "row_field",
      },
      field_data_props: {
        name: "email",
        id: "email",
        placeholder: "Ingresa tu correo",
        type: "email",
      },
    },
  ];

  const inital_state_form = {
    email: "",
  };

  const submitForgotPassword = async (form_state) => {
    const email = form_state.email; 
    try {
      const response = await fetch(import.meta.env.VITE_URL_API + "/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), 
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      alert("Hubo un error al enviar la solicitud. Intenta más tarde.");
    }
  };
  

  return (
    <div className="auth-screen-container">
      <div className="recovery-header"><h1>Restablecer contraseña</h1></div>
      
      <p>Ingresa tu correo para restablecer tu contraseña</p>
      <Form form_fields={form_fields} action={submitForgotPassword} inital_state_form={inital_state_form} className={"recovery_form"}>
        <button type="submit">Enviar enlace</button>
        <Link to="/login">Volver a iniciar sesión</Link>
      </Form>
    </div>
  );
};

export default ForgotPassword;
