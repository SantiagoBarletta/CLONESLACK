import React, { useState, useEffect } from "react";
import "./EditProfile.css";

const EditProfile = ({ onCloseEdit }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    profileImage: "",
    birthdate: "",
  });
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

        if (!response.ok) throw new Error("Error al cargar los datos del usuario");

        const { data } = await response.json();
        setFormData({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          profileImage: data.profile_image || "",
          birthdate: data.fecha_nacimiento
            ? new Date(data.fecha_nacimiento).toISOString().split("T")[0]
            : "",
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024; // 1MB en bytes
    if (file.size > maxSize) {
      setError("El archivo seleccionado es demasiado grande. El tamaño máximo permitido es 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, profileImage: reader.result }));
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
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar los datos del usuario");

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
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          required
        />

        <label>Apellido:</label>
        <input
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleInputChange}
        />

        <label>Imagen de Perfil:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {formData.profileImage && (
          <img src={formData.profileImage} alt="Preview" className="image-preview" />
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
