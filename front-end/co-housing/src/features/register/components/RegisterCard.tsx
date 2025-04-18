import React, { useState } from 'react';
import styles from '../pages/RegisterPage.module.css';
import { Navigate, useNavigate } from "react-router-dom";

export const RegisterCard = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    lifestyle: {
      sociable: 3,
      tranquilo: 3,
      compartir: 3,
      orden: 3,
      actividad: 3,
    },
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectRole = (role: string) => {
    setFormData({ ...formData, role });
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Enviar datos a la API
      fetch('http://localhost:8081/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Error al registrar");
          }
          return res.json()
        })
        .then(data => {
          setSuccess('Registro completado correctamente');
          setTimeout(() => {
            navigate('/home');
          }, 2000); // pequeño delay para ver el mensaje
        })
        .catch(err => {
          setError(err.message);
        });
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div>
      <div className={styles.card}>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.progressDots}>
          {[0, 1, 2, 3, 4].map((_, index) => (
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
            <p>¿Qué buscas ahora mismo?<br></br>Buscador : Buscas una nueva comunidad<br></br>Ofertante : Buscas gente para tu comunidad</p>
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

        {step === 4 && (
          <div className={styles.step}>
            <h2>Conócete un poco más</h2>
            <p>Ayúdanos a entender mejor tu estilo de vida.</p>
            {[
              { name: "sociable", label: "¿Qué tan sociable eres?" },
              { name: "tranquilo", label: "¿Qué tan importante es para ti la tranquilidad?" },
              { name: "compartir", label: "¿Qué tanto te gusta compartir espacios?" },
              { name: "orden", label: "¿Cuánto valoras la limpieza y el orden?" },
              { name: "actividad", label: "¿Prefieres una comunidad activa o más relajada?" },
            ].map((q) => (
              <div key={q.name} className={styles.question}>
                <label>{q.label}</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.lifestyle[q.name as keyof typeof formData.lifestyle]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lifestyle: {
                        ...formData.lifestyle,
                        [q.name]: parseInt(e.target.value),
                      },
                    })
                  }
                />
                <div className={styles.rangeLabels}>
                  <span>1</span>
                  <span>-5</span>
                </div>
              </div>
            ))}
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
            {step < 4 ? '▶️' : 'Registrarse'}
          </button>
        </div>
      </div>
    </div>
  );
};
