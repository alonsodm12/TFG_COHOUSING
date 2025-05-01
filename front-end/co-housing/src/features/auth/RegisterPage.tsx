import React from "react";
import { RegisterCard } from './RegisterCard';
import { HeaderLanding } from "../ui/Header/HeaderLanding";
import { Footer } from "../ui/Footer/Footer";
import common from "../../../index.css";

const RegisterPage: React.FC = () => {
  return (
    <div id="root">
      <HeaderLanding />
      <main className="page">
        <RegisterCard />
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;