import React from "react";
import { LoginCard } from './LoginCard';
import { HeaderLanding } from '../ui/Header/HeaderLanding';
import { Footer } from "../ui/Footer/Footer";


const LoginPage: React.FC = () => {
  return (
    <div id="root">
      <HeaderLanding />
      <main className="page">
        <LoginCard />
      </main>
        <Footer />
      
    </div>
  );
};

export default LoginPage;
