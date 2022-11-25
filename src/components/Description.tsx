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
        This app supports several AI algorithms that you can play against. The
        random AI and the greedy AI are the easiest to defeat. The random AI
        simply plays random moves, while the greedy AI flips the greatest number
        of tiles that it can on its turn.
      </p>
      <p>
        The static AI plays moves that maximize a balance of mobility &#40;the
        number of playable moves per turn&#41; and discs captured. This AI also
        prefers to capture the corners of the board when it is able. It poses a
        greater challenge than the random or greedy AIs, but it still doesn't
        calculate ahead past the current turn.
      </p>
      <p>
        The remaining AIs apply a minimax algorithm with alpha-beta pruning to
        calculate one or more moves ahead. They ultimately evaluate positions
        with the same criteria that the static AI uses, but they assess possible
        future positions rather than current one. Generally, an AI will improve
        in performance as the number of moves it looks ahead increases. If you'd
        like a challenge, try playing against the Minimax+3 AI.
      </p>
      <p>
        This app was built with React. You can find the source code{" "}
        <a href="/#">here</a>, and my developer portfolio <a href="/#">here</a>.
        Thanks for checking out my app, and I hope you have fun!
      </p>
    </section>
  );
};

export default Description;
