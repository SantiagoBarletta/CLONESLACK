import React, { useEffect, useState } from "react";
import { MdOutlineMail, MdClose, MdEdit, MdMessage  } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./UserInfo.css";

const UserInfo = ({ user, viewInfo, setViewInfo, onEditProfile, onSendMessage }) => {
    const [userData, setUserData] = useState(user || null);
    const [isLoading, setIsLoading] = useState(!user || !user.firstname);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !user.firstname) {
                setIsLoading(true);
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_URL_API}/api/users/${user.id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem(
                                    "access-token"
                                )}`,
                            },
                        }
                    );

                    if (!response.ok)
                        throw new Error("Error al obtener los datos del usuario");

                    const { data } = await response.json();
                    setUserData(data);
                } catch (error) {
                    console.error("Error al obtener datos del usuario:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    useEffect(() => {
        const token = sessionStorage.getItem("access-token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            setIsOwnProfile(decodedToken.user_id === user?.id);
        }
    }, [user]);

    if (isLoading) {
        return  <div className="loading-container">
        <img src="/Imagenes/loading.gif" alt="Cargando..." className="loading-img" />
        </div>;
    }

    if (!userData) {
        return <div className="error">Error al cargar los datos del usuario.</div>;
    }

    const formatBirthdate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className={viewInfo}>
            <div className="close">
                <MdClose
                    className="arrow"
                    onClick={() => setViewInfo("infoContainer-none")}
                />
            </div>

            <div className="bioInfo">
                <img
                    src={userData.profile_image || "/Imagenes/user.png"}
                    alt={`${userData.firstname || "Usuario"} ${userData.lastname || ""}`}
                    className="userImage"
                />
                <div className="contact-info">
                    <div className="contact-name">
                        {userData.firstname || ""} {userData.lastname || ""}
                    </div>
                    <div className="username">@{userData.username}</div>
                </div>
            </div>

            <div className="userInfo">
                <h3>Información de contacto</h3>
                <div className="contact">
                    <MdOutlineMail className="icon" />
                    <div className="correo">
                        <p>
                            <strong>Dirección de Correo</strong>
                        </p>
                        <p>{userData.email || "Correo no disponible"}</p>
                    </div>
                </div>
                <div className="birthdate">
                    <FaBirthdayCake className="icon" />
                    <div className="birthdate-info">
                        <p>
                            <strong>Fecha de nacimiento</strong>
                        </p>
                        <p>
                            {userData.fecha_nacimiento
                                ? formatBirthdate(userData.fecha_nacimiento)
                                : "No especificada"}
                        </p>
                    </div>
                </div>
            </div>

            {!isOwnProfile && (
                <button
                    className="send-message-button"
                    onClick={onSendMessage} 
                >
                   <MdMessage className="icon" /> Enviar Mensaje
                </button>
            )}

            {isOwnProfile && (
                <div className="edit-profile">
                    <button className="edit-profile-button" onClick={onEditProfile}>
                        <MdEdit className="icon" /> Editar Perfil
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
