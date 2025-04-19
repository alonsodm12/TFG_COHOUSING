import React from "react";
import { Header } from "../components/Header";
import { Body } from "../components/Body";
import { Footer } from "../components/Footer";
import styles from './LandingPage.module.css';
import { Opiniones } from "../components/Opiniones";

const LandingPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <Body />
      <Opiniones />
      <Footer />
    </div>
  );
};

export default LandingPage;