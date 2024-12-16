import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import "./EditProfile.css";

const EditProfile = ({ onCloseEdit }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("access-token");
        const userID = JSON.parse(atob(token.split(".")[1])).user_id;

        const response = await fetch(
          `${import.meta.env.VITE_URL_API}/api/users/${userID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok)
          throw new Error("Error al cargar los datos del usuario");

        const { data } = await response.json();
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
        setProfileImage(data.profile_image);
        const formattedDate = data.fecha_nacimiento
          ? new Date(data.fecha_nacimiento).toISOString().split("T")[0]
          : "";
        setBirthdate(formattedDate);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
        setError(
            "El archivo seleccionado es demasiado grande. El tamaño máximo permitido es 1MB."
        );
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        setProfileImage(reader.result); 
        setError(null); 
    };
    reader.readAsDataURL(file);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("access-token");
      const userID = JSON.parse(atob(token.split(".")[1])).user_id;

      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/api/users/${userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            profile_image: profileImage || null,
            fecha_nacimiento: birthdate,
          }),
        }
      );

      if (!response.ok)
        throw new Error("Error al actualizar los datos del usuario");

      alert("Perfil actualizado con éxito");
      onCloseEdit();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>Nombre:</label>
        <input
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label>Apellido:</label>
        <input value={lastname} onChange={(e) => setLastname(e.target.value)} />

        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <label>Imagen de Perfil:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {profileImage && (
          <img src={profileImage} alt="Preview" className="image-preview" />
        )}
        {error && <p className="error">{error}</p>}

        <div className="form-buttons">
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={onCloseEdit} className="cancel-button">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
