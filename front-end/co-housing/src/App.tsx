// App.tsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { LandingPage } from "./features/ui/Landing";
import { RegisterPage } from "./features/auth";
import { LoginPage } from "./features/auth/";
import { CommunityProfilePage } from "./features/community/pages/CommunityProfilePage";
import CreateCommunityPage from "./features/community/pages/CreateCommunityPage";
import UpdateCommunityPage from "./features/community/pages/UpdateCommunityPage";
import { UserHomePage } from "./features/users/pages/UserHomePage";
import { UserProfilePage } from "./features/users/pages/UserProfilePage";
import { UpdateProfilePage } from "./features/users/pages/UpdateProfilePage";
import Dudas from "./features/ui/Dudas/Dudas";
import Recommendations from "./features/recommendor/pages/Recommendations";
import SolicitudesPage from "./features/solicitudes/pages/SolicitudesPage";
import { CommunityUserPage } from "./features/community/pages/CommunityUserPage";
import CreateTask from "./features/community/pages/CreateTask";
import { TaskListPage } from "./features/community/pages/TaskListPage";
import { EventoListPage } from "./features/community/pages/EventoListPage";
import CreateEvent from "./features/community/pages/CreateEvent";
import { TaskProfilePage } from "./features/community/pages/TaskProfilePage";
import { AdministrarTareas } from "./features/community/pages/AdministrarTareas";
import { UserComunidadesGuardadas } from "./features/users/pages/UserComunidadesGuardadas";
import { UserProvider } from "./features/ui/Context/UserContext";
import UserExternoPage from "./features/users/pages/UserExternoPage";

export const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/TFG_COHOUSING/" element={<LandingPage />} />
          <Route path="/TFG_COHOUSING/registro" element={<RegisterPage />} />
          <Route path="/TFG_COHOUSING/login" element={<LoginPage />} />

          {/* Rutas protegidas */}
          <Route path="/TFG_COHOUSING/home" element={<UserHomePage />} />
          <Route path="/TFG_COHOUSING/community/profile/:communityName" element={<CommunityProfilePage />} />
          <Route path="/TFG_COHOUSING/community/create/:username" element={<CreateCommunityPage />} />
          <Route path="/TFG_COHOUSING/community/edit" element={<UpdateCommunityPage />} />
          <Route path="/TFG_COHOUSING/user/profile" element={<UserProfilePage />} />
          <Route path="/TFG_COHOUSING/user/profile/edit" element={<UpdateProfilePage />} />
          <Route path="/TFG_COHOUSING/dudas" element={<Dudas />} />
          <Route path="/TFG_COHOUSING/recommendations/:id" element={<Recommendations />} />
          <Route path="/TFG_COHOUSING/solicitudes/:userId" element={<SolicitudesPage />} />
          <Route path="/TFG_COHOUSING/CommunityUserPage/:userId" element={<CommunityUserPage />} />
          <Route path="/TFG_COHOUSING/CreateTask/:idComunidad" element={<CreateTask />} />
          <Route path="/TFG_COHOUSING/CreateEvent/:idComunidad" element={<CreateEvent />} />
          <Route path="/TFG_COHOUSING/TaskListPage/:userId" element={<TaskListPage />} />
          <Route path="/TFG_COHOUSING/EventoListPage/:userId" element={<EventoListPage />} />
          <Route path="/TFG_COHOUSING/Tarea/:taskId" element={<TaskProfilePage />} />
          <Route path="/TFG_COHOUSING/AdministrarTareas/:id" element={<AdministrarTareas />} />
          <Route path="/TFG_COHOUSING/user/comunidadesGuardadas" element={<UserComunidadesGuardadas />} />
          <Route path="/TFG_COHOUSING/user/externo/:username" element={<UserExternoPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};
