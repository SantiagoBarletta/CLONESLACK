const obtenerWorkspaces = async () => {
  const response = await fetch(`${import.meta.env.VITE_URL_API}/api/workspaces`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al obtener los workspaces");
  }

  const data = await response.json();
  return data;
};

export default obtenerWorkspaces;
