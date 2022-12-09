import { data, testData } from "./inputData";

describe("day 5", () => {
  let stacks1: string[][];
  let stacks2: string[][];
  let moves: number[][];

  beforeAll(() => {
    const [stackData, moveData] = data.split("\n\n");
    const stackRows = stackData.split("\n").reverse().slice(1);
    stacks1 = [...Array((stackRows[0].length - 3) / 4 + 1)].map(() => []);
    stackRows.forEach((row) => {
      [...row].forEach((letter, i) => {
        if ([" ", "[", "]"].includes(letter)) {
          return;
        }

        stacks1[(i - 1) / 4].push(letter);
      });
    });
    stacks2 = stacks1.map((stack) => [...stack]);

    moves = moveData.split("\n").map<number[]>((moveRow) =>
      moveRow
        .split(" ")
        .map((input) => parseInt(input))
        .filter((num) => !isNaN(num))
    );
  });

  it("1", () => {
    moves.forEach((move) => {
      for (let i = 0; i < move[0]; i++) {
        stacks1[move[2] - 1].push(stacks1[move[1] - 1].pop() || " ");
      }
    });
    const message = stacks1.reduce<string>(
      (prev, stack) => `${prev}${stack[stack.length - 1]}`,
      ""
    );
    console.log(message);
  });

  it("2", () => {
    moves.forEach((move) => {
      const tmp: string[] = [];
      for (let i = 0; i < move[0]; i++) {
        tmp.push(stacks2[move[1] - 1].pop() || " ");
      }
      for (let i = 0; i < move[0]; i++) {
        stacks2[move[2] - 1].push(tmp.pop() || " ");
      }
    });
    const message = stacks2.reduce<string>(
      (prev, stack) => `${prev}${stack[stack.length - 1]}`,
      ""
    );
    console.log(message);
  });
});
