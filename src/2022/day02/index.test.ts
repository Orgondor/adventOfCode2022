import { data, testData } from "./inputData";
import { sum } from "../util";

enum Move {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

enum Result {
  Loss = 0,
  Draw = 3,
  Win = 6,
}

const moveTranslation: Record<string, Move> = {
  A: Move.Rock,
  B: Move.Paper,
  C: Move.Scissors,
  X: Move.Rock,
  Y: Move.Paper,
  Z: Move.Scissors,
};

const resultTranslation: Record<string, Result> = {
  X: Result.Loss,
  Y: Result.Draw,
  Z: Result.Win,
};

type Match = {
  opponentMove: Move;
  yourMove: Move;
  result: number;
};

const winningMove: Record<Move, Move> = {
  [Move.Rock]: Move.Paper,
  [Move.Paper]: Move.Scissors,
  [Move.Scissors]: Move.Rock,
};

const loosingMove: Record<Move, Move> = {
  [Move.Rock]: Move.Scissors,
  [Move.Paper]: Move.Rock,
  [Move.Scissors]: Move.Paper,
};

const move1Result = (move1: Move, move2: Move): Result => {
  if (move1 === move2) {
    return Result.Draw;
  }

  if (winningMove[move2] === move1) {
    return Result.Win;
  }

  return Result.Loss;
};

const moveFromResult = (move: Move, result: Result): Move => {
  if (result === Result.Draw) {
    return move;
  }

  if (result === Result.Win) {
    return winningMove[move];
  }

  return loosingMove[move];
};

describe("day 1", () => {
  let matches1: Match[];
  let matches2: Match[];

  beforeAll(() => {
    matches1 = data.split("\n").map((matchString) => {
      const matchMoves = matchString.split(" ");
      const opponentMove = moveTranslation[matchMoves[0]];
      const yourMove = moveTranslation[matchMoves[1]];
      return {
        opponentMove,
        yourMove,
        result: move1Result(yourMove, opponentMove),
      };
    });
    matches2 = data.split("\n").map((matchString) => {
      const matchMoves = matchString.split(" ");
      const opponentMove = moveTranslation[matchMoves[0]];
      const result = resultTranslation[matchMoves[1]];
      return {
        opponentMove,
        yourMove: moveFromResult(opponentMove, result),
        result,
      };
    });
  });

  it("1", () => {
    const moveScore = sum(...matches1.map((match) => match.yourMove));
    const resultScore = sum(...matches1.map((match) => match.result));
    console.log(
      "---Strategy 1--- Your move score:",
      moveScore,
      "result score:",
      resultScore,
      "total:",
      moveScore + resultScore
    );
  });

  it("2", () => {
    const moveScore = sum(...matches2.map((match) => match.yourMove));
    const resultScore = sum(...matches2.map((match) => match.result));
    console.log(
      "---Strategy 2--- Your move score:",
      moveScore,
      "result score:",
      resultScore,
      "total:",
      moveScore + resultScore
    );
  });
});
