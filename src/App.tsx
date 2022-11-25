import Header from "./components/Header";
import Board from "./components/Board";
import Modal from "./components/Modal";
import Scoreboard from "./components/Scoreboard";
import Description from "./components/Description";
import styles from "./App.module.css";
import useApp from "./hooks/App/useApp";

function App() {
  const {
    position,
    aiState,
    modal,
    players,
    humanPlayMove,
    isValidHumanMove,
    openModal,
    closeModal,
    closeEndgame,
    startNewGame,
  } = useApp();
  return (
    <div className="app">
      <Header openModal={openModal} />
      <main className={styles.main}>
        <Scoreboard
          blackScore={position.blackTiles}
          whiteScore={position.whiteTiles}
          currentPlayer={position.playerToMove}
          players={[
            `${players.evaluators[0]}${
              players.depth[0] ? "+" + players.depth[0] : ""
            }`,
            `${players.evaluators[1]}${
              players.depth[1] ? "+" + players.depth[1] : ""
            }`,
          ]}
          thinking={aiState.thinking}
          gameOver={position.gameOver}
        />
        <Board
          board={position.board}
          humanPlayMove={humanPlayMove}
          isValidHumanMove={isValidHumanMove}
        />
      </main>
      <Description />
      <Modal
        showModal={modal.show}
        startNewGame={startNewGame}
        closeModal={closeModal}
        showEndgame={modal.endgame}
        closeEndgame={closeEndgame}
        blackScore={position.blackTiles}
        whiteScore={position.whiteTiles}
      />
    </div>
  );
}

export default App;
