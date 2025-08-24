// App.tsx
import { Routes, Route } from "react-router-dom";

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/home" element={<UserHomePage />} />
        <Route
          path="/community/profile/:communityName"
          element={<CommunityProfilePage />}
        />
        <Route
          path="/community/create/:username"
          element={<CreateCommunityPage />}
        />
        <Route path="/community/edit" element={<UpdateCommunityPage />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/user/profile/edit" element={<UpdateProfilePage />} />
        <Route path="/dudas" element={<Dudas />} />
        <Route path="/recommendations/:id" element={<Recommendations />} />
        <Route path="/solicitudes/:userId" element={<SolicitudesPage />} />
        <Route
          path="/CommunityUserPage/:userId"
          element={<CommunityUserPage />}
        />
        <Route path="/CreateTask/:idComunidad" element={<CreateTask />} />
        <Route path="/CreateEvent/:idComunidad" element={<CreateEvent />} />
        <Route path="/TaskListPage/:userId" element={<TaskListPage />} />
        <Route path="/EventoListPage/:userId" element={<EventoListPage />} />
        <Route path="/Tarea/:taskId" element={<TaskProfilePage />} />
        <Route path="/AdministrarTareas/:id" element={<AdministrarTareas />} />
        <Route
          path="/user/comunidadesGuardadas"
          element={<UserComunidadesGuardadas />}
        />
        <Route path="/user/externo/:username" element={<UserExternoPage />} />
      </Routes>
    </UserProvider>
  );
};
