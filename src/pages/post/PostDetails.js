import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostDetails, addComment, deletePost, deleteComment } from '../../services/api';  // Asegúrate de importar las funciones necesarias

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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

  const handleDeletePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debe estar logueado para eliminar el post.');
      return;
    }

    try {
      await deletePost(token, postId);
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar el post:', error);
      setError(error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCommentError('Debe estar logueado para eliminar el comentario.');
      return;
    }

    try {
      await deleteComment(token, commentId);
      // Actualizar los comentarios del post
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter(comment => comment.id !== commentId),
      }));
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
      setCommentError(error.message);
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
      <button onClick={handleDeletePost}>Eliminar Post</button>
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
              <button onClick={() => handleDeleteComment(comment.id)}>Eliminar Comentario</button>
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
