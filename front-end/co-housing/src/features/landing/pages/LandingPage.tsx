import React from "react";
import { Header } from "../components/Header";
import { Body } from "../components/Body";
import { Footer } from "../components/Footer";
import styles from './LandingPage.module.css';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default LandingPage;