// App.tsx
import { Routes, Route } from 'react-router-dom';

import { LandingPage } from './features/ui/Landing';
import { RegisterPage } from './features/auth';

import { LoginPage } from './features/auth/';
import { CommunityProfilePage } from './features/community/pages/CommunityProfilePage';
import CreateCommunityPage from './features/community/pages/CreateCommunityPage';
import UpdateCommunityPage from './features/community/pages/UpdateCommunityPage';
import { UserHomePage } from './features/users/pages/UserHomePage';
import { UserProfilePage } from './features/users/pages/UserProfilePage';
import { UpdateProfilePage } from './features/users/pages/UpdateProfilePage';
import Dudas from './features/ui/Dudas/Dudas';
import Recommendations from './features/recommendor/pages/Recommendations';

export const App = () => {
  return (
    <Routes>
      <Route path="/TFG_COHOUSING/" element={<LandingPage />} />
      <Route path="/TFG_COHOUSING/registro" element={<RegisterPage />} />
      <Route path="/TFG_COHOUSING/home" element={<UserHomePage />} />
      <Route path="/TFG_COHOUSING/login" element={<LoginPage />} />

      <Route path="/TFG_COHOUSING/community" element={<CommunityProfilePage />} />
      <Route path="/TFG_COHOUSING/community/create" element={<CreateCommunityPage />} />
      <Route path="/TFG_COHOUSING/community/edit" element={<UpdateCommunityPage />} />
      <Route path="/TFG_COHOUSING/user/profile" element={<UserProfilePage/>} />
      <Route path="/TFG_COHOUSING/user/profile/edit" element={<UpdateProfilePage/>} />
      <Route path="/TFG_COHOUSING/dudas" element={<Dudas/>} />
      <Route path="/TFG_COHOUSING/recommendations" element={<Recommendations />} />
    </Routes>
  );

};
