import React, { useState } from "react";
import useForm from "@hooks/useForm";
import { Link } from "react-router-dom";
import Form from '../../Components/Form';



const ForgotPasswordScreen = () => {
  const { formState, handleChange } = useForm({
    email: ''
  });
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Manejo de errores

  

useForm

const form_fields = [
  {
      label_text: 'Ingresa tu correo electrónico:',
      field_component: 'INPUT',
      field_container_props: {
          className: 'row_field',
      },
      field_data_props: {
          name: 'email',
          id: 'email',
          placeholder: '',
          type: 'email',
      },
  },
];

const inital_state_form = {
  email: '',
};


const submitForgotPassword = async (form_state) => {
  const email = form_state.email;
  console.log('Email a enviar:', email); 

  try {
      const response = await fetch(import.meta.env.VITE_URL_API + '/api/auth/forgot-password', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
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
      console.error('Error al enviar solicitud:', error);
      alert("Hubo un error al enviar la solicitud. Intenta más tarde.");
  }
}


  return (
    <div>
      <h1>Restablecer contraseña</h1>
      <p>Ingresa tu correo para restablecer tu contraseña</p>
      <Form form_fields={form_fields} action={submitForgotPassword} inital_state_form={inital_state_form}>
                <button type='submit'>Restablecer</button>
                <Link to='/login'>Iniciar sesion</Link>
            </Form>
    </div>
  );
};

export default ForgotPasswordScreen;
