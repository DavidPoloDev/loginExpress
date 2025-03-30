import React, { useState } from 'react'; // Importamos React y el hook useState
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redireccionar
import './signin.css'; // Importamos los estilos CSS

// Componente de inicio de sesión
const SignIn = () => {
  // Hook useNavigate para redireccionar después del login
  const navigate = useNavigate();
  
  // Estado para el formulario con valores iniciales vacíos
  const [form, setForm] = useState({ 
    correo_electronico: '', 
    contraseña: '' 
  });

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    // Actualiza el estado del formulario usando el nombre del input como clave
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Obtiene los usuarios guardados en localStorage o un array vacío si no hay
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Busca un usuario que coincida con el correo y contraseña ingresados
    const match = users.find(
      u => u.correo_electronico === form.correo_electronico && 
           u.contraseña === form.contraseña
    );

    // Si encontró un usuario que coincide
    if (match) {
      // Guarda el usuario activo en localStorage
      localStorage.setItem('activeUser', JSON.stringify(match));
      // Muestra mensaje de éxito
      alert('Inicio de sesión exitoso');
      // Redirecciona a la página de tabla
      navigate('/table');
    } else {
      // Muestra mensaje de error si las credenciales son incorrectas
      alert('Credenciales inválidas');
    }
  };

  // Estructura del componente
  return (
    // Contenedor principal
    <div className="signin-container">
      {/* Formulario de inicio de sesión */}
      <form className="signin-form" onSubmit={handleSubmit}>
        {/* Logo de la aplicación */}
        <img 
          src="/img/logo_coffee_background.png" 
          alt="logo" 
          className="header-image" 
        />
        {/* Título del formulario */}
        <h2>Sign In</h2>
        
        {/* Campo para el correo electrónico */}
        <input
          type="email" // Tipo email para validación básica
          name="correo_electronico" // Nombre que debe coincidir con la propiedad en el estado
          placeholder="Email" // Texto de ayuda
          value={form.correo_electronico} // Valor controlado por el estado
          onChange={handleChange} // Función que maneja los cambios
          required // Campo requerido
        />
        
        {/* Campo para la contraseña */}
        <input
          type="password" // Tipo password para ocultar los caracteres
          name="contraseña" // Nombre que debe coincidir con la propiedad en el estado
          placeholder="Password" // Texto de ayuda
          value={form.contraseña} // Valor controlado por el estado
          onChange={handleChange} // Función que maneja los cambios
          required // Campo requerido
        />
        
        {/* Botón para enviar el formulario */}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default SignIn;