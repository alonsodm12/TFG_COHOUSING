// App.tsx
import { Routes, Route } from 'react-router-dom';

import { LandingPage } from './features/landing';
import { RegisterPage } from './features/register';
import { HomePage } from './features/home';

export const App = () => {
  return (
    <Routes>
      <Route path="/TFG_COHOUSING/" element={<LandingPage />} />
      <Route path="/TFG_COHOUSING/registro" element={<RegisterPage />} />
      <Route path="/TFG_COHOUSING/home" element={<HomePage />} />
    </Routes>
  );

};
