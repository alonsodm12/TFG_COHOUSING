import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center mt-18">
      <div className="max-w-6xl mx-auto px-4 py-3 md:flex md:justify-between md:items-center">
        {/* Logo y marca */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-white">ShareSpace</h2>
          <p className="text-gray-400 mt-1">Tu espacio compartido para crear y gestionar tu nueva vida</p>
        </div>

        {/* Navegación */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <a href="/TFG_COHOUSING/contacto" className="hover:text-white transition">Contacto</a>
          <a href="/TFG_COHOUSING/terminos" className="hover:text-white transition">Términos</a>
        </div>

        {/* Redes sociales */}
        <div className="flex gap-4 mt-6 md:mt-0">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.916 4.916 0 00-8.38 4.482 13.939 13.939 0 01-10.125-5.14 4.822 4.822 0 001.523 6.573A4.897 4.897 0 01.96 9.1v.061a4.916 4.916 0 003.946 4.827 4.902 4.902 0 01-2.212.084 4.918 4.918 0 004.588 3.417A9.867 9.867 0 010 19.54 13.94 13.94 0 007.548 22c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" />
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24H12.82v-9.294H9.692V11.12h3.128V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.762v2.31h3.587l-.467 3.587h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.314.975.975 1.252 2.242 1.314 3.608.058 1.266.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.34 2.633-1.314 3.608-.975.975-2.242 1.252-3.608 1.314-1.266.058-1.645.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.34-3.608-1.314-.975-.975-1.252-2.242-1.314-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.34-2.633 1.314-3.608C4.522 2.503 5.789 2.226 7.155 2.163 8.421 2.105 8.8 2.094 12 2.094zM12 0C8.741 0 8.332.013 7.052.072 5.775.131 4.597.38 3.603 1.374c-.994.994-1.243 2.172-1.302 3.449C2.013 6.668 2 7.078 2 10.337v3.326c0 3.259.013 3.669.072 4.948.059 1.277.308 2.455 1.302 3.449.994.994 2.172 1.243 3.449 1.302 1.279.059 1.688.072 4.948.072s3.669-.013 4.948-.072c1.277-.059 2.455-.308 3.449-1.302.994-.994 1.243-2.172 1.302-3.449.059-1.279.072-1.688.072-4.948V10.337c0-3.259-.013-3.669-.072-4.948-.059-1.277-.308-2.455-1.302-3.449C19.455.38 18.277.131 17 .072 15.719.013 15.309 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0-2.881 1.44 1.44 0 0 0 0 2.881z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 py-4 text-center text-gray-500 text-sm">
        &copy; 2025 ShareSpace. Todos los derechos reservados.
      </div>
    </footer>
  );
};
