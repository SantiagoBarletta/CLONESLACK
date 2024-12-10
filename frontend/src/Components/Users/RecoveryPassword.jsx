import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Form from "../Form";
import "./Users.css";

const RecoveryPassword = () => {
  const { reset_token } = useParams();
  const [message, setMessage] = useState(null);

  const actionRecoveryPassword = async (form_state) => {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/api/auth/recovery-password/${reset_token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: form_state.password, 
        }),
      }
    );
  
    const data = await response.json();
  
    if (response.ok) {
      setMessage(data.message);
      alert(data.message);
      window.location.href = data.redirectUrl;
    } else {
      setMessage(data.message || "Hubo un error al restablecer la contraseña.");
      alert(data.message || "Error desconocido.");
    }
  };
  

  const form_fields = [
    {
      label_text: "Nueva contraseña",
      field_component: "INPUT",
      field_container_props: {
        className: "row_field",
      },
      field_data_props: {
        name: "password",
        id: "password",
        placeholder: "Ingresa nueva contraseña",
        type: "password",
      },
    },
  ];

  const inital_state_form = {
    password: "",
  };

  return (
    <div className="auth-screen-container">
      <h1>Restablecer contraseña</h1>
      {message && <div className="message">{message}</div>}
      <Form action={actionRecoveryPassword} form_fields={form_fields} inital_state_form={inital_state_form}>
        <button type="submit">Actualizar contraseña</button>
        <Link to="/login">Volver a iniciar sesión</Link>
      </Form>
    </div>
  );
};

export default RecoveryPassword;
