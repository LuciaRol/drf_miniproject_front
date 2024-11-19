import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostDetails, addComment } from '../../services/api';  // Asegúrate de importar la función addComment

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debe estar logueado para ver esta página.');
      setLoading(false);
    } else {
      fetchPostDetails(token, postId)
        .then(data => {
          setPost(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener el post:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [postId]);

  const [name, setName] = useState('');
const [email, setEmail] = useState('');

const handleCommentSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    setCommentError('Debe estar logueado para comentar.');
    return;
  }

  if (!name || !email) {
    setCommentError('Nombre y correo son obligatorios.');
    return;
  }

  try {
    const data = await addComment(token, postId, comment, name, email);
    setCommentSuccess('Comentario añadido exitosamente');
    setComment('');
    setName('');
    setEmail('');
    setCommentError(null);

    // Actualizar los comentarios del post
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, data],
    }));
  } catch (error) {
    console.error('Error al añadir el comentario:', error);
    setCommentError('Error al añadir el comentario');
    setCommentSuccess(null);
  }
};


  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post no encontrado.</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p><strong>ID del Usuario:</strong> {post.user_id}</p>
      <p><strong>Nombre del Usuario:</strong> {post.username}</p>
      <h2>Comentarios</h2>
      {post.comments.length === 0 ? (
        <p>No hay comentarios disponibles.</p>
      ) : (
        <ul>
          {post.comments.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>{comment.user && comment.user.username ? comment.user.username : 'Anónimo'}:</strong> {comment.body}
              </p>
            </li>
          ))}
        </ul>
      )}
        <h3>Añadir un comentario</h3>
        {commentError && <p style={{ color: 'red' }}>{commentError}</p>}
        {commentSuccess && <p style={{ color: 'green' }}>{commentSuccess}</p>}
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu comentario aquí"
            required
          />
          <button type="submit">Añadir Comentario</button>
        </form>
    </div>
  );
};

export default PostDetails;
