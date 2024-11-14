// api.js
const API_URL = 'http://127.0.0.1:8000';  // Cambia la URL según la configuración de tu backend

// Función para realizar el login
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Especifica que el cuerpo será JSON
      },
      body: JSON.stringify({ username, password }),  // Cuerpo de la solicitud
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    const data = await response.json();  // Procesamos la respuesta en formato JSON
    return data;  // Retornamos los datos (como el token)

  } catch (error) {
    throw error;  // Lanzamos el error para que se maneje en otro lugar
  }
};

// Aquí puedes agregar más funciones para otras solicitudes de la API
