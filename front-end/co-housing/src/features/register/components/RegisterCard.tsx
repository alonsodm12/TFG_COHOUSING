import React, { useState } from 'react';
import styles from '../pages/RegisterPage.module.css';

export const RegisterCard = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectRole = (role: string) => {
    setFormData({ ...formData, role });
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Enviar datos a la API
      fetch('http://localhost:8081/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Registro completado:', data);
        });
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div>
      <div className={styles.card}>
        {/* Progreso */}
        <div className={styles.progressDots}>
          {[0, 1, 2, 3].map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${step === index ? styles.active : ''}`}
            />
          ))}
        </div>

        {step === 0 && (
          <div>
            <h2>Introduce un nombre de usuario</h2>
            <p>Piensa algo que te identifique y sea reconocible.<br></br>¡Recuerda que
              deben tomarte en serio!
            </p>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Usuario"
            />
          </div>
        )}

        {step === 1 && (
          <div className={styles.step}>
            <h2>Introduce tu correo</h2>
            <p>Te permitirá estar al tanto de todo lo que pase en tu comunidad.</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h2>Establece la contraseña</h2>
            <p>Piensa en algo seguro y anótalo para que no se te olvide</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
            />
          </div>
        )}

        {step === 3 && (
          <div className={styles.step}>
            <h2>Elige tu rol</h2>
            <p>¡Último paso!<br></br>¿Qué buscas ahora mismo?<br></br>Buscador : Buscas una nueva comunidad<br></br>Ofertante : Buscas gente para tu comunidad</p>
            <div className={styles.roles}>
              <div
                className={`${styles.roleBox} ${formData.role === 'buscador' ? styles.selected : ''}`}
                onClick={() => selectRole('buscador')}
              >
                🔎 Buscador
              </div>
              <div
                className={`${styles.roleBox} ${formData.role === 'ofertante' ? styles.selected : ''}`}
                onClick={() => selectRole('ofertante')}
              >
                🏠 Ofertante
              </div>
            </div>
          </div>
        )}

        {/* BOTONES DE NAVEGACIÓN */}
        <div className={styles.navigation}>
          {step > 0 && (
            <button onClick={prevStep} className={styles.secondaryButton}>
              ◀️
            </button>
          )}
          <button onClick={nextStep} className={styles.secondaryButton}>
            {step < 3 ? '▶️' : 'Registrarse'}
          </button>
        </div>
      </div>
    </div>
  );
};
