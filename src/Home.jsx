import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación entre páginas
import './home.css'; // Importamos los estilos específicos para esta página

// Definimos el componente Home
const Home = () => {
    return (
        // Contenedor principal de la página
        <div className="home-container">
            {/* Cabecera de la página que contiene el logo y la navegación */}
            <header className="cabecera">
                {/* Contenedor del logo */}
                <div className="logo-cabecera">
                    <img 
                        src="/img/logo_coffee_background.png" 
                        alt="QC Master" 
                        className="logo" 
                    />
                </div>
                {/* Barra de navegación con enlaces a otras páginas */}
                <nav className="navegacion">
                    <ul>
                        {/* Lista de enlaces a diferentes rutas de la aplicación */}
                        <li><Link to="/faq" className="text">Frequent Questions</Link></li>
                        <li><Link to="/contact" className="text">Contact Us</Link></li>
                        <li><Link to="/about" className="text">About Us</Link></li>
                        <li><Link to="/" className="nav-button">Home</Link></li>
                        <li><Link to="/signin" className="nav-button">Sign In</Link></li>
                        <li><Link to="/signup" className="nav-button">Sign Up</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Contenido principal de la página */}
            <main className="container">
                {/* Sección hero (principal) con título y descripción */}
                <section className="hero">
                    <h1>Reduce Time and Improve Productivity</h1>
                    <p>
                        Keep traceability of coffee samples, organize workspace, and save work 
                        with statistical projections.
                    </p>
                </section>

                {/* Sección de galería con imágenes */}
                <section className="gallery">
                    <h2>Roast Types and Sensory Evaluation</h2>
                    {/* Contenedor de las imágenes de la galería */}
                    <div className="gallery-images">
                        {/* Usamos map para iterar sobre un array de objetos de imágenes */}
                        {[
                            { src: "/img/tipos_de_tueste.png", alt: "Coffee Roast Types" },
                            { src: "/img/rueda_sabores.png", alt: "Coffee Flavor Wheel" },
                            { src: "/img/tueste-de-cafe.png", alt: "Roasted Coffee" }
                        ].map((image, index) => (
                            // Para cada imagen creamos un div con una key única
                            <div key={index} className="gallery-item">
                                <img src={image.src} alt={image.alt} />
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Pie de página con información de copyright */}
            <footer className="firma">
                {/* Usamos new Date().getFullYear() para obtener el año actual automáticamente */}
                QC-Master Web © {new Date().getFullYear()} -- All Rights Reserved
            </footer>
        </div>
    );
};

// Exportamos el componente para poder usarlo en otras partes de la aplicación
export default Home;