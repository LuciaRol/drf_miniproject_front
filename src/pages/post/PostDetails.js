import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostDetails } from '../../services/api';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    </div>
  );
};

export default PostDetails;
