# Othello

This is a browser app which allows the user to play Othello. You may play against another human (on the same device), or against an AI of varying levels of difficulty. You may also have the AI play against itself.

You can visit the app [here](https://ryangroch.github.io/othello-ai-v2/).

## What is Othello?

Othello is a two player strategy game, comparable to chess or checkers. If you are not familiar with the game, I recommend reading a full description of the rules [here](https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english).

## The Algorithm

This app uses the minimax algorithm to calculate which move the AI should play. The minimax algorithm is a type of recursive algorithm which involves computing every possible position that can occur within a specified number of moves. Once the algorithm reaches the specified depth, it performs a static evaluation, usually involving a different algorithm, to determine how favorable the position is. One crude example of a static evaluation would be to count the number of tiles each player occupies, and rate the position as the difference between the two numbers.

As the algorithm assesses each position, it makes the assumption that each player will play the move which the algorithm deems to be the most favorable for that player. Therefore, each position prior to the specified depth is given the same assessment as the best (according to the static evaluation) possible move that each player can make on a given turn.

Eventually, the algorithm is able to make an assessment of the current position based on the information gained from looking ahead. It plays the move which leads to the position that the static evaluation deems most favorable, assuming that perfect play from both players.

### Alpha-Beta Pruning

I’ve decided to use a particular variation of the minimax algorithm that involves alpha-beta pruning. All else being equal, the minimax algorithm evaluates every possible position that can be reached within the specified depth; alpha-beta pruning is a way of reducing the number of positions that the algorithm needs to compute.

Alpha-beta pruning includes some conditional logic to determine whether the algorithm should explore a particular branch of possible positions. Before exploring the possible pathway, the algorithm checks whether optimal play from both players, given the positions currently explored, could ever possibly reach that position. If optimal play would lead the players elsewhere, then there is no need to explore that particular branch.

### More Information

My favorite explanation of the minimax algorithm with alpha-beta pruning can be found [here](https://www.youtube.com/watch?v=l-hh51ncgDI&t=591s) in a video format.

## Technologies Used

This app was built with React and Vite. The Minimax algorithm runs in a web worker to ensure that the computations do not freeze the user interface.

## Possible Improvements

There are several improvements that I’d be interested in making to this app in the future.

- Improving the speed of the algorithm. I’ve been finding that on any depth greater than 3, the minimax algorithm is unacceptably slow. In order to correct this, I could rewrite the algorithm in Webassembly (WASM) code
- Including an opening book would also be helpful to improving the speed of the algorithm in the early stages of the game.
- Bitboard computation would also speed up the algorithm substantially.
- To improve the quality of the algorithm, I’d like to experiment with machine learning as an alternative to the static evaluation function.
