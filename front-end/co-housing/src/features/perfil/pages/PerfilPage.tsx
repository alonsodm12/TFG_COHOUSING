import React from "react";
import { Header } from "../components/Header";
import Body from "../components/Body";
import styles from './PerfilPage.module.css';

const PerfilPage: React.FC = () => {
    return (
      <div className={styles.page}>
        <Header />
        <Body />
      </div>
    )
};

export default PerfilPage;