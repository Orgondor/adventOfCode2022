import { data, testData } from "./inputData";

describe("day 10", () => {
  let instructions: number[][];
  const registerValue: number[] = [1];

  beforeAll(() => {
    instructions = data
      .replace(/addx/g, "2")
      .replace(/noop/g, "1")
      .split("\n")
      .map((row) => row.split(" ").map((num) => +num));

    let addOnNext: number | undefined;
    instructions.forEach((instruction) => {
      const lastValue =
        registerValue[registerValue.length - 1] + (addOnNext || 0);
      registerValue.push(lastValue);
      if (instruction[0] == 2) {
        registerValue.push(lastValue);
      }

      addOnNext = instruction[1];
    });
  });

  it("1", () => {
    let sum = 0;
    let i = 20;
    while (registerValue[i] !== undefined) {
      sum += registerValue[i] * i;
      i += 40;
    }

    console.log("sum:", sum);
  });

  it("2", () => {
    let crt = "";
    registerValue.slice(1).some((value, i) => {
      if (Math.abs(value - (i % 40)) < 2) {
        crt += "#";
      } else {
        crt += ".";
      }
      if ((i + 1) % 40 == 0) {
        crt += "\n";
      }
    });
    console.log(`CRT output:\n${crt}`);
  });
});
