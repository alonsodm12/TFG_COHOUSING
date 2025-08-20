import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import BodyHero from "../components/BodyHero";

export const UserHomePage = () => {
  return (
    <div id="root">
      <Header />
        <main className="page">
          <BodyHero />
        </main>
      <Footer />
    </div>
  );
};
