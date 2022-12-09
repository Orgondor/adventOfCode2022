import { Point2d, point2dToString } from "../util";
import { data, testData } from "./inputData";

type Move = {
  direction: string;
  steps: number;
};

const visitedPositions1: Record<string, boolean> = {
  ["0,0"]: true,
};

const visitedPositions2: Record<string, boolean> = {
  ["0,0"]: true,
};

const directions: Record<string, Point2d> = {
  R: { x: 1, y: 0 },
  U: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  D: { x: 0, y: -1 },
};

describe("day 9", () => {
  let moves: Move[];
  const headPos: Point2d = { x: 0, y: 0 };
  const tailPos: Point2d[] = [...Array(9)].map(() => ({ x: 0, y: 0 }));

  const moveTail = (head: Point2d, tail: Point2d) => {
    const xDiff = head.x - tail.x;
    const yDiff = head.y - tail.y;

    if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
      if (xDiff == 0) {
        tail.y += yDiff / Math.abs(yDiff);
      } else if (yDiff == 0) {
        tail.x += xDiff / Math.abs(xDiff);
      } else {
        tail.x += xDiff / Math.abs(xDiff);
        tail.y += yDiff / Math.abs(yDiff);
      }
    }
  };

  const moveHead = (step: Point2d) => {
    headPos.x += step.x;
    headPos.y += step.y;

    tailPos.forEach((tail, i) => {
      if (i == 0) {
        moveTail(headPos, tail);
        return;
      }
      moveTail(tailPos[i - 1], tail);
    });

    visitedPositions1[point2dToString(tailPos[0])] = true;
    visitedPositions2[point2dToString(tailPos[8])] = true;
  };

  beforeAll(() => {
    moves = data.split("\n").map((moveString) => {
      const split = moveString.split(" ");
      return {
        direction: split[0],
        steps: +split[1],
      };
    });

    moves.forEach((move) => {
      [...Array(move.steps)].forEach(() => {
        moveHead(directions[move.direction]);
      });
    });
  });

  it("1", () => {
    console.log(Object.keys(visitedPositions1).length);
  });

  it("2", () => {
    console.log(Object.keys(visitedPositions2).length);
  });
});
