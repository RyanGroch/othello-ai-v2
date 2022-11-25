import { FC } from "react";
import styles from "./Header.module.css";

const Header: FC<{ openModal: () => void }> = ({ openModal }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <h1>Othello</h1>
        <button className="btn" onClick={openModal}>
          New Game
        </button>
      </div>
    </header>
  );
};

export default Header;
