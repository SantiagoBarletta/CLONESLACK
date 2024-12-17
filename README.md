## **Proyecto CLONESLACK**

Este proyecto es una aplicación de mensajería similar a Slack, desarrollada con **React** en el frontend y **Node.js con Express** en el backend. La aplicación permite a los usuarios crear espacios de trabajo, canales y enviar mensajes en tiempo real.

---

### **Características**

#### **Frontend:**
- **Espacios de Trabajo:**  
  Listado de workspaces con la cantidad de usuarios y la posibilidad de crear nuevos.
- **Canales:**  
  Dentro de cada espacio, los usuarios pueden crear canales y enviar mensajes.  
  También es posible buscar mensajes específicos y resaltar las coincidencias.
- **Mensajes:**  
  - Envío de mensajes en tiempo real.
  - Borrar mensajes existentes.
  - Envío de mensajes privados entre usuarios.
- **Perfil del Usuario:**  
  - Edición de perfil con validación de imágenes (máximo 1MB).
  - Previsualización de imagen antes de subirla.
- **Rutas protegidas:**  
  Navegación entre páginas autenticadas con **react-router-dom** y JWT.

#### **Backend:**
- **Autenticación segura:**  
  - Login y registro de usuarios con JWT.  
  - Contraseñas cifradas con **bcrypt**.
- **Protección de rutas:**  
  Acceso restringido a rutas protegidas mediante middleware JWT.
- **Base de datos:**  
  Persistencia de datos con **MySQL**.
- **API RESTful:**  
  Endpoints para manejar workspaces, canales, mensajes y actualización de perfil.

---

### **Tecnologías Utilizadas**

#### **Frontend:**
- React
- React Router
- JavaScript
- CSS

#### **Backend:**
- Node.js
- Express
- MySQL
- Bcrypt
- JSON Web Tokens (JWT)

---
