// features/user/pages/UserProfilePage.tsx
import { useUser } from "../hook/useUser";

import common from "../../../index.css";

import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import BodyHero from "../components/BodyHero";

export const UserHomePage = () => {

  //const { user, loading } = useUser(username); // ← aquí podrías meter el ID logueado

  //if (!user) return <p>{alonso} No se pudo cargar el perfil.</p>;

  return (
    <div id="root">
      <Header />
      <main className="page">
        <BodyHero />
      </main>
      <Footer/>  
    </div>
  );
};
