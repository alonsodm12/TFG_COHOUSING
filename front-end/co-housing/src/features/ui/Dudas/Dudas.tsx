import { useState } from "react";
import Button from "../Button/Button";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

const Dudas: React.FC = () => {
  const [duda, setDuda] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const enviarDuda = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar la duda, por ejemplo, hacer una solicitud a una API.
    setMensajeEnviado(true);
    setDuda("");
  };

  return (
    <div id="root">
      <Header />
      <main className="page">
        <div className="max-w-4xl mx-auto w-full p-6">
          {/* Título */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-blue-900">
              Sección de Dudas
            </h1>
            <p className="text-lg text-gray-700 mt-2">
              Aquí podrás encontrar respuestas a preguntas frecuentes o enviar
              una nueva duda.
            </p>
          </div>

          {/* Preguntas frecuentes (FAQ) */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-bold text-gray-800">¿Qué es Cohousing?</h3>
                <p className="text-sm text-gray-600">
                  Cohousing es una forma de vivienda colaborativa donde las
                  personas viven en comunidad, compartiendo espacios comunes
                  mientras mantienen sus espacios privados.
                </p>
              </li>
              <li>
                <h3 className="font-bold text-gray-800">
                  ¿Cómo puedo unirme a una comunidad?
                </h3>
                <p className="text-sm text-gray-600">
                  Puedes registrarte como "Buscador" y explorar las comunidades
                  disponibles. Si encuentras una que te interese, puedes ponerte
                  en contacto con los ofertantes.
                </p>
              </li>
              <li>
                <h3 className="font-bold text-gray-800">
                  ¿Qué debo hacer si tengo un espacio para ofrecer?
                </h3>
                <p className="text-sm text-gray-600">
                  Si tienes un espacio disponible, puedes registrarte como
                  "Ofertante" y crear una nueva comunidad para que otros puedan
                  unirse.
                </p>
              </li>
            </ul>
          </div>

          {/* Formulario para enviar una nueva duda */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              ¿Tienes alguna duda?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Si no encuentras la respuesta en las preguntas frecuentes, por
              favor, envía tu duda a través de este formulario.
            </p>
            <form onSubmit={enviarDuda} className="space-y-4">
              <textarea
                value={duda}
                onChange={(e) => setDuda(e.target.value)}
                placeholder="Escribe tu duda aquí..."
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                rows={4}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Enviar Duda
              </button>
            </form>
            {mensajeEnviado && (
              <p className="mt-4 text-green-600 text-center">
                ¡Gracias! Tu duda ha sido enviada.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dudas;
