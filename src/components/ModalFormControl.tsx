import styles from "./ModalFormControl.module.css";
import { PlayerType } from "../uiTypes";
import type { FC } from "react";

type Props = {
  player: PlayerType;
  depth: number;
  name: string;
  handleFormInput: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  >;
};

const GetFormOptions: FC = () => {
  return (
    <>
      {Object.keys(PlayerType).map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </>
  );
};

const ModalFormControl: FC<Props> = ({
  player,
  depth,
  name,
  handleFormInput,
}) => {
  return (
    <>
      <div className={styles.form__control}>
        <label htmlFor={`${name}Player`}>{name} Player:</label>
        <select id={`${name}Player`} value={player} onChange={handleFormInput}>
          <GetFormOptions />
        </select>
      </div>
      {player !== PlayerType.Human && player !== PlayerType.Random && (
        <div className={styles.form__control}>
          <label htmlFor={`${name}Depth`}>{name} AI Depth:</label>
          <input
            id={`${name}Depth`}
            value={depth}
            type="number"
            onChange={handleFormInput}
            min="0"
            max="10"
          />
        </div>
      )}
    </>
  );
};

export default ModalFormControl;
