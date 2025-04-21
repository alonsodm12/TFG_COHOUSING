import React from 'react';
import styles from "../pages/PerfilPage.module.css";

const Body: React.FC = () => {
    const handleDeleteUser = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/usuarios/1', {
            method: 'DELETE',
          });
    
          if (response.ok) {
            console.log('Usuario eliminado con éxito');
            alert('Usuario eliminado');
          } else {
            console.error('Error al eliminar el usuario');
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };
    
      const handleEditUser = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/usuarios/1', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: 'alonso_actualizado',
              email: 'nuevoemail@example.com',
              password: 'nuevaclave123',
              role: 'buscador',
              sociabilidad: 3,
              tranquilidad: 4,
              compartirEspacios: 2,
              limpieza: 5,
              actividad: 1,
            }),
          });
    
          if (response.ok) {
            console.log('Usuario modificado con éxito');
            alert('Datos modificados');
          } else {
            console.error('Error al modificar el usuario');
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };
    

  return (
    <div className={styles.bodyContainer}>
      <h2>Opciones de Usuario</h2>
      <ul>
        <li>
          <button onClick={handleDeleteUser} className={styles.deleteButton}>
            Eliminar Usuario
          </button>
        </li>
        <li>
          <button onClick={handleEditUser} className={styles.editButton}>
            Modificar Datos del Usuario
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Body;
