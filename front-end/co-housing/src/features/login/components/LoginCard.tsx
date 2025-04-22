import React, { useState } from 'react';
import styles from '../pages/LoginPage.module.css';
import { useNavigate } from "react-router-dom";

export const LoginCard = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const enviar = () => {
        // Enviar datos a la API
        fetch('http://localhost:8081/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Error al logearse");
                }
                return res.json()
            })
            .then((res) => {
                localStorage.setItem('token', res["Login correcto: "].token);
                setSuccess('Login completado correctamente');
                setTimeout(() => {
                    navigate('/TFG_COHOUSING/home');
                }, 2000); // pequeño delay para ver el mensaje
            })
            .catch(err => {
                setError(err.message);
            });
    };


    return (
        <div>
            <div className={styles.card}>
                {error && <div className={styles.error}>{error}</div>}
                {success && <div className={styles.success}>{success}</div>}



                <h1>¡Bienvenido de nuevo!</h1>
                <h2>Introduce tu nombre de usuario</h2>
                
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Usuario"
                />

                <h2>Introduce la contraseña</h2>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                />
                <button className={styles.button} onClick={enviar}>Iniciar Sesión</button>


            </div>
        </div>
    );
};
