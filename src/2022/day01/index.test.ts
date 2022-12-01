import { data, testData } from "./inputData";
import { sum, maxEntries } from "../util";

describe("day 1", () => {
  let workData: number[][];
  let elfCalories: number[];

  beforeAll(() => {
    workData = data
      .split("\n\n")
      .map((load) => load.split("\n").map((num) => +num));
    elfCalories = workData.map((loads) => sum(...loads));
  });

  it("1", () => {
    console.log("max elf calories:", Math.max(...elfCalories));
  });

  it("2", () => {
    console.log("max elf calories:", sum(...maxEntries(3, ...elfCalories)));
  });
});
