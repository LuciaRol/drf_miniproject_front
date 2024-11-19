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
  try {
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

    const data = await response.json();
    return data;  // Retornamos los datos del nuevo usuario

  } catch (error) {
    throw error;  // Lanzamos el error para que se maneje en otro lugar
  }
};

/* FUNCIÓN PARA OBTENER EL PERFIL DEL USUARIO */
export const fetchProfile = async (token, userId) => {
  try {
    const response = await fetch(`${API_URL}/profile/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener el perfil');
    }

    const data = await response.json();
    return data;  // Retornamos los datos del perfil

  } catch (error) {
    throw error;  // Lanzamos el error para que se maneje en otro lugar
  }
};

/* FUNCIÓN PARA ACTUALIZAR EL PERFIL DEL USUARIO */
export const updateProfile = async (token, userId, username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/profile/${userId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el perfil');
    }

    const data = await response.json();
    return data;  // Retornamos los datos actualizados del perfil

  } catch (error) {
    throw error;  // Lanzamos el error para que se maneje en otro lugar
  }
};

/* FUNCIÓN PARA OBTENER POSTS */
export const fetchPosts = async (token) => {
  try {
    const response = await fetch(`${API_URL}/posts/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los posts');
    }

    const data = await response.json();
    return data;  // Retornamos los datos de los posts

  } catch (error) {
    throw error;  // Lanzamos el error para que se maneje en otro lugar
  }
};

/* FUNCIÓN PARA CREAR UN POST */
export const createPost = async (token, title, body) => {
  try {
    const response = await fetch(`${API_URL}/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, body })
    });

    if (!response.ok) {
      throw new Error('Error al crear el post');
    }

    const data = await response.json();
    return data;  // Retornamos los datos del nuevo post

  } catch (error) {
    throw error;  // Lanzamos el error para que se maneje en otro lugar
  }
};

/* FUNCIÓN PARA OBTENER LOS DETALLES DE UN POST */
export const fetchPostDetails = async (token, postId) => {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener el post');
    }

    const data = await response.json();
    return data;  // Retornamos los datos del post con sus comentarios

  } catch (error) {
    throw error;  // Lanzamos el error para que se maneje en otro lugar
  }
};



/* FUNCIÓN PARA AÑADIR UN COMENTARIO A UN POST */
export const addComment = async (token, postId, body, name, email) => {
  try {
    const response = await fetch(`${API_URL}/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        post: postId, 
        name: name, 
        email: email, 
        body })
    });

    if (!response.ok) {
      throw new Error('Error al añadir el comentario');
    }

    const data = await response.json();
    return data;  // Retornamos los datos del nuevo comentario

  } catch (error) {
    throw error;  // Lanzamos el error para que se maneje en otro lugar
  }
};

