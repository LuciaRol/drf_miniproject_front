// src/api.js

import axios from 'axios';

// Crear una instancia de axios para personalizar la configuración
const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Coloca la URL base de tu API aquí
});

// Interceptor para agregar el token de autenticación a las solicitudes
api.interceptors.request.use(
  config => {
    // Obtiene el token JWT almacenado en localStorage
    const token = localStorage.getItem('token');  // Cambia el almacenamiento si usas otro lugar para el token
    if (token) {
      // Si el token existe, lo agrega a los headers de la solicitud
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // En caso de error, retorna la promesa rechazada
    return Promise.reject(error);
  }
);

// Exporta la instancia de axios para usarla en el resto de la aplicación
export default api;
