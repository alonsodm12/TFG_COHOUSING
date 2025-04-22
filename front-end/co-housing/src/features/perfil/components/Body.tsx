import React from 'react';
import styles from "../pages/PerfilPage.module.css";
import { getUsernameFromToken } from '../../authUtils';
import { useNavigate } from "react-router-dom";
const Body: React.FC = () => {
    const navigate = useNavigate();
    const username = getUsernameFromToken();
    const token = localStorage.getItem('token');
    console.log(username);
    const handleDeleteUser = async () => {
        try {
          const response = await fetch('http://localhost:8081/user/delete/'+username, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
    
          if (response.ok) {
            console.log('Usuario eliminado con éxito');
            alert('Usuario eliminado');
            navigate("/TFG_COHOUSING/");
          } else {
            console.error('Error al eliminar el usuario');
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };
    
      const handleEditUser = () => {
        navigate("/TFG_COHOUSING/registro");
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
