// main.tsx
import ReactDOM from 'react-dom/client'; // Para React 18+
import './index.css'; // Si estás usando Tailwind o CSS global
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { UserProvider } from './features/ui/Context/UserContext';
// @ts-ignore

// Asegúrate de envolver tu App con BrowserRouter para que Link funcione
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <UserProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </UserProvider>
);