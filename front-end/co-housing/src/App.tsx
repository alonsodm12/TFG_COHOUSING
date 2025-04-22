// App.tsx
import { Routes, Route } from 'react-router-dom';

import { LandingPage } from './features/landing';
import { RegisterPage } from './features/register';
import { HomePage } from './features/home';
import { PerfilPage } from './features/perfil';
import { LoginPage } from './features/login';

export const App = () => {
  return (
    <Routes>
      <Route path="/TFG_COHOUSING/" element={<LandingPage />} />
      <Route path="/TFG_COHOUSING/registro" element={<RegisterPage />} />
      <Route path="/TFG_COHOUSING/home" element={<HomePage />} />
      <Route path="/TFG_COHOUSING/login" element={<LoginPage />} />
      <Route path="/TFG_COHOUSING/perfil" element={<PerfilPage />} />
      <Route path="/TFG_COHOUSING/register" element={<RegisterPage />} />
    </Routes>
  );

};
