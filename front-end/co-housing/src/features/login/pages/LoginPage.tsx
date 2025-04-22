import React from "react";
import { LoginCard } from '../components/LoginCard';
import styles from './LoginPage.module.css';
import { Header } from "../../landing/components/Header";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <LoginCard />
    </div>
  );
};

export default LoginPage;