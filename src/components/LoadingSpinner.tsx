import type { FC } from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner: FC = () => {
  return <div className={styles.spinner}></div>;
};

export default LoadingSpinner;
