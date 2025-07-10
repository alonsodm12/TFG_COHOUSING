const GoogleLoginButton = () => {
    const handleLogin = () => {
      window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };
  
    return (
      <button onClick={handleLogin}>
        Iniciar sesión con Google
      </button>
    );
  };
  
  export default GoogleLoginButton;
  