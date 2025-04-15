import React from "react";
import { RegisterCard } from '../components/RegisterCard';
import styles from './RegisterPage.module.css';
import { Header } from "../../landing/components/Header";

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <RegisterCard />
    </div>
  );
};

export default RegisterPage;