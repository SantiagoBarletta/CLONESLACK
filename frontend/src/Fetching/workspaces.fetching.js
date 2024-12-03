const obtenerWorkspaces = async () => {
    const response = await fetch(
      '/slack.json',
       { 
        method: "GET" 
      }
    );
    return response.json();
    
  };

  export default obtenerWorkspaces