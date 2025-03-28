import React, { useState } from 'react'; // Importamos React y el hook useState
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la redirección
import './signup.css'; // Importamos los estilos CSS específicos para este componente

// Definimos el componente de registro (SignUp)
const SignUp = () => {
  // Hook para navegar programáticamente entre rutas
  const navigate = useNavigate();
  
  // Estado inicial del formulario con campos vacíos
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    document_type: '',
    document_number: '',
    correo_electronico: '',
    contraseña: '',
    rol: '',
    fecha_nacimiento: ''
  });

  // Función para manejar los cambios en los inputs del formulario
  const handleChange = (e) => {
    // Actualiza el estado con los nuevos valores usando el nombre del campo como clave
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Obtiene los usuarios existentes de localStorage o un array vacío si no hay ninguno
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Añade el nuevo usuario al array
    users.push(form);
    
    // Guarda el array actualizado en localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Muestra mensaje de éxito
    alert('Registro exitoso');
    
    // Redirecciona al usuario a la página de inicio de sesión
    navigate('/signin');
  };

  // Estructura del componente
  return (
    // Contenedor principal
    <div className="signup-container">
      {/* Logo de la aplicación */}
      <img 
        src="/img/logo_coffee_background.png" 
        alt="logo" 
        className="header-image" 
      />
      
      {/* Formulario de registro */}
      <form className="registration-form" onSubmit={handleSubmit}>
        {/* Título del formulario */}
        <h2>Registration Form</h2>
        
        {/* Campo para el nombre */}
        <input 
          type="text" // Tipo texto para nombres
          name="nombre" // Nombre que coincide con la propiedad en el estado
          placeholder="Name" // Texto de ayuda
          value={form.nombre} // Valor controlado por el estado
          onChange={handleChange} // Función para manejar cambios
          required // Campo obligatorio
        />
        
        {/* Campo para el apellido */}
        <input 
          type="text" 
          name="apellido" 
          placeholder="Last Name" 
          value={form.apellido} 
          onChange={handleChange} 
          required 
        />

        {/* Selector para el tipo de documento */}
        <select 
          name="document_type" 
          value={form.document_type} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Document Type</option>
          <option value="CC">Citizenship ID</option>
          <option value="CE">Foreign ID</option>
          <option value="TI">Identity Card</option>
        </select>

        {/* Campo para el número de documento */}
        <input 
          type="number" // Tipo numérico para documentos
          name="document_number" 
          placeholder="Document Number" 
          value={form.document_number} 
          onChange={handleChange} 
          required 
        />
        
        {/* Campo para el correo electrónico */}
        <input 
          type="email" // Tipo email para validación básica
          name="correo_electronico" 
          placeholder="Email" 
          value={form.correo_electronico} 
          onChange={handleChange} 
          required 
        />
        
        {/* Campo para la contraseña */}
        <input 
          type="password" // Tipo password para ocultar caracteres
          name="contraseña" 
          placeholder="Password" 
          value={form.contraseña} 
          onChange={handleChange} 
          required 
        />

        {/* Selector para el rol del usuario */}
        <select 
          name="rol" 
          value={form.rol} 
          onChange={handleChange} 
          required
        >
          <option value="">Select a Role</option>
          <option value="Catador">Taster</option>
          <option value="Admin">Admin</option>
          <option value="Usuario">User</option>
        </select>

        {/* Campo para la fecha de nacimiento */}
        <input 
          type="date" // Tipo fecha con selector de calendario
          name="fecha_nacimiento" 
          placeholder="Date of Birth" 
          value={form.fecha_nacimiento} 
          onChange={handleChange} 
          required 
        />

        {/* Botón para enviar el formulario */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default SignUp;