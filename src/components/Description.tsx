import styles from "./Description.module.css";

const Description = () => {
  return (
    <section className={styles.description}>
      <h2>What Is This?</h2>
      <p>
        Othello is a two-player strategy game, much like Chess or Checkers. This
        app allows you to play Othello against either a human player &#40;on the
        same computer&#41; or an AI. You can also have two AI opponents play
        against each other.
      </p>
      <h3>How To Play</h3>
      <p>
        Both players take turns placing discs of their color on the board. The
        game begins with four discs placed in the center of the board. Black
        traditionally makes the first move.
      </p>
      <p>
        On their turn, Black places a disc on the board such that there is a
        straight line &#40;horizontal, vertical, or diagonal&#41; of one or more
        contiguous white discs between the new disc and any other black disc.
        Any white discs that are between the new disc and another black disc are
        flipped and become black discs.
      </p>
      <p>
        White then plays, and follows the same rules but with the roles
        reversed. White places a disc anywhere such that one or more contiguous
        black discs are between the new disc and previous white discs. They flip
        any black discs that are between the new disc and any other existing
        white discs.
      </p>
      <p>
        A disc may be placed on any tile provided that it flips at least one
        disc of the opposing color. Play continues until either all the tiles
        are occupied or until neither player is able to make a move. Players
        must make a move on their turn if they are able; they pass their turn if
        and only if they do not have any moves that flip at least one disc. When
        a player passes their turn, their opponent then makes a move and the
        game continues.
      </p>
      <p>
        The winner of the game is the player with more discs of their color
        present at the end of the game. If both players have an equal number of
        discs, the game is considered to be a draw.
      </p>
      <h3>About This App</h3>
      <p>
        This app allows you to play against several different AI algorithms. The
        random and greedy algorithms are the easiest to defeat. The random
        algorithm plays a random valid move on each turn, while the greedy
        algorithm attempts to maximize its number of tiles.
      </p>
      <p>
        There are two additional algorithms you can play against. The static
        algorithm aims to strike a balance between maximizing the number of
        available moves and tiles captured. It also captures corners when
        possible. The dynamic algorithm changes its priorities based on how far
        the game has progressed.
      </p>
      <p>
        Additionally, all algorithms aside from “random” allow you to add depth.
        The depth of an algorithm refers to the number of moves that it looks
        ahead. A greedy+3 algorithm, for instance, will aim to maximize its
        tiles three turns ahead of the current move.
      </p>
      <p>
        This app was built with React. You can find the source code{" "}
        <a href="https://github.com/Thrasymachuss/othello-ai-v2">here</a>, and
        my developer portfolio{" "}
        <a href="https://thrasymachuss.github.io/portfolio">here</a>. Thanks for
        checking out my app, and I hope you have fun!
      </p>
    </section>
  );
};

export default Description;
