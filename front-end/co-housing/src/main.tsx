// main.tsx

import ReactDOM from 'react-dom/client'; // Para React 18+
import './index.css'; // Si estás usando Tailwind o CSS global
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';

// Asegúrate de envolver tu App con BrowserRouter para que Link funcione
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);