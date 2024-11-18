// api.js
const API_URL = 'http://127.0.0.1:8000';  // Cambia la URL según la configuración de tu backend

/* FUNCIÓN PARA EL LOGIN */
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



/* FUNCIÓN PARA EL REGISTRO */

export const register = async (username, email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });

  if (!response.ok) {
    throw new Error('Error al registrar');
  }

  return await response.json();
};

// ... otras funciones de la API

