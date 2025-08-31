import React from "react";
import { Body } from "./Body";
import { Footer } from "../Footer/Footer";
import { HeaderLanding } from "../Header/HeaderLanding";

const LandingPage: React.FC = () => {
  return (
    <div id="root">
      <HeaderLanding />
        <main className="page">
          <Body />
        </main>
      <Footer />
    </div>
  );
};

export default LandingPage;