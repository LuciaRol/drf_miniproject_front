import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../services/api';  // Importa la función createPost desde api.js
import '../../css/create-post.css';  // Importa el archivo CSS

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debe estar logueado para crear un post.');
      return;
    }

    try {
      const data = await createPost(token, title, body);
      setSuccess('Post creado exitosamente');
      setTitle('');
      setBody('');
      setError(null);

      // Redirigir a la lista de posts después de crear uno nuevo
      navigate('/home');
    } catch (error) {
      console.error('Error al crear el post:', error);
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreatePost} className="create-post-form">
        <h1>Nuevo post</h1>
        
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <label>Título</label>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Contenido</label>
        <textarea
          placeholder="Contenido"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default CreatePost;
