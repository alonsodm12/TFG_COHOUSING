// src/components/ui/Spinner.tsx
import styles from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};
