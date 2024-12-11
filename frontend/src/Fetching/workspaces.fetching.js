const obtenerWorkspaces = async () => {
  try {
    const token = sessionStorage.getItem("access-token");

    if (!token) {
      throw new Error("No se encontró el token de acceso.");
    }

    const response = await fetch(`${import.meta.env.VITE_URL_API}/api/workspaces`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los workspaces");
    }

    const data = await response.json();
    return data.workspaces; 
  } catch (error) {
    console.error("Error en obtenerWorkspaces:", error);
    throw error;
  }
};
