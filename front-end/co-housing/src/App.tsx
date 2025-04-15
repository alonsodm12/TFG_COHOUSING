// App.tsx
import { Routes, Route } from 'react-router-dom';

import { LandingPage } from './features/landing';
import { RegisterPage } from './features/register';

export const App = () => {
  return (
    <Routes>
      <Route path="/TFG_COHOUSING/" element={<LandingPage />} />
      <Route path="/TFG_COHOUSING/registro" element={<RegisterPage />} />
    </Routes>
  );

};
