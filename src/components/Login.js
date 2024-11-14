// Login.js
const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Guardamos el token en localStorage
        localStorage.setItem('token', data.token);
        // Redirigimos al perfil
        history.push('/profile');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Error during login');
    }
  };
  