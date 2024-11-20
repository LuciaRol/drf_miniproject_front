import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostDetails, addComment, deletePost, deleteComment, editPost, editComment } from '../../services/api';

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
  const [editMode, setEditMode] = useState(false);
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostBody, setEditPostBody] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentBody, setEditCommentBody] = useState('');
  const [editCommentName, setEditCommentName] = useState('');
  const [editCommentEmail, setEditCommentEmail] = useState('');

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
        comments: [...prevPost.comments, { ...data, name }], // Agregar el nombre en los comentarios
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

  const handleEditPost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debe estar logueado para editar el post.');
      return;
    }

    try {
      const updatedPost = await editPost(token, postId, editPostTitle, editPostBody);
      setPost((prevPost) => ({
        ...prevPost,
        title: updatedPost.title,
        body: updatedPost.body
      }));
      setEditMode(false);
    } catch (error) {
      console.error('Error al editar el post:', error);
      setError(error.message);
    }
  };

  const handleEditComment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setCommentError('Debe estar logueado para editar el comentario.');
      return;
    }

    try {
      const updatedComment = await editComment(token, editCommentId, editCommentBody, editCommentName, editCommentEmail);
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.map(comment =>
          comment.id === editCommentId ? updatedComment : comment
        ),
      }));
      setEditCommentId(null);
      setEditCommentBody('');
      setEditCommentName('');
      setEditCommentEmail('');
    } catch (error) {
      console.error('Error al editar el comentario:', error);
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
      {editMode ? (
        <div>
          <input
            type="text"
            value={editPostTitle}
            onChange={(e) => setEditPostTitle(e.target.value)}
            placeholder="Título del Post"
            required
          />
          <textarea
            value={editPostBody}
            onChange={(e) => setEditPostBody(e.target.value)}
            placeholder="Contenido del Post"
            required
          />
          <button onClick={handleEditPost}>Guardar Cambios</button>
          <button onClick={() => setEditMode(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <p><strong>Autor:</strong> {post.username}</p>
          <p><em>Creado en:</em> {new Date(post.created_at).toLocaleString()}</p>
          <button onClick={() => { setEditMode(true); setEditPostTitle(post.title); setEditPostBody(post.body); }}>Editar Post</button>
          <button onClick={handleDeletePost}>Eliminar Post</button>
        </div>
      )}
      <h2>Comentarios</h2>
      {post.comments.length === 0 ? (
        <p>No hay comentarios disponibles.</p>
      ) : (
        <ul>
          {post.comments.map((comment) => (
            <li key={comment.id}>
              {editCommentId === comment.id ? (
                <form onSubmit={handleEditComment}>
                  <input
                    type="text"
                    value={editCommentName}
                    onChange={(e) => setEditCommentName(e.target.value)}
                    placeholder="Nombre"
                    required
                  />
                  <input
                    type="email"
                    value={editCommentEmail}
                    onChange={(e) => setEditCommentEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    required
                  />
                  <textarea
                    value={editCommentBody}
                    onChange={(e) => setEditCommentBody(e.target.value)}
                    placeholder="Escribe tu comentario aquí"
                    required
                  />
                  <button type="submit">Guardar Cambios</button>
                  <button type="button" onClick={() => setEditCommentId(null)}>Cancelar</button>
                </form>
              ) : (
                <div>
                  <p>
                    <strong>{comment.name || 'Anónimo'}:</strong> {comment.body}
                  </p>
                  <p><em>{new Date(comment.created_at).toLocaleString()}</em></p>
                  <button onClick={() => { 
                    setEditCommentId(comment.id); 
                    setEditCommentBody(comment.body); 
                    setEditCommentName(comment.name); 
                    setEditCommentEmail(comment.email); 
                  }}>Editar Comentario</button>
                  <button onClick={() => handleDeleteComment(comment.id)}>Eliminar Comentario</button>
                </div>
              )}
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
