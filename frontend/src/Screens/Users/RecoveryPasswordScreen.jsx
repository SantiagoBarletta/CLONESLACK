import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Form from '../../Components/Form';


const RecoveryPasswordScreen = () => {
    const { reset_token } = useParams();
    console.log('Token de reset de contraseña:', reset_token);

    const [message, setMessage] = useState(null); 

    const actionRecoveryPassword = async (form_state) => {
        console.log(form_state);

        const response = await fetch(
            `${import.meta.env.VITE_URL_API}/api/auth/recovery-password/${reset_token}`,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: form_state.password,
                }),
            }
        );

        const data = await response.json();
        console.log({ data });

        if (response.ok) {

            setMessage(data.message);
            alert(data.message); 
            window.location.href = data.redirectUrl; 
        } else {
            
            setMessage(data.message || "Error desconocido");
            alert(data.message || "Hubo un error al restablecer la contraseña.");
        }
    };

    const form_fields = [
        {
            label_text: 'Ingresa nueva contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field',
            },
            field_data_props: {
                name: 'password',
                id: 'password',
                placeholder: '',
                type: 'password',
            },
        },
    ];

    const inital_state_form = {
        password: '',
    };

    return (
        <div>
            <h1>Modifica tu contraseña</h1>
            {message && <div>{message}</div>} {/* Muestra el mensaje en pantalla */}
            <Form action={actionRecoveryPassword} form_fields={form_fields} inital_state_form={inital_state_form}>
                <button type="submit">Restablecer</button>
                <Link to="/login">Iniciar sesión</Link>
            </Form>
        </div>
    );
};

export default RecoveryPasswordScreen;
