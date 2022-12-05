import { data, testData } from "./inputData";

type Section = {
  start: number;
  end: number;
};

const fullOverlap = (a: Section, b: Section): boolean => {
  return (
    (a.start <= b.start && a.end >= b.end) ||
    (b.start <= a.start && b.end >= a.end)
  );
};

const anyOverlap = (a: Section, b: Section): boolean => {
  return (
    fullOverlap(a, b) ||
    (a.start <= b.start && a.end >= b.start) ||
    (a.start <= b.end && a.end >= b.end)
  );
};

describe("day ", () => {
  let workData: Section[][];

  beforeAll(() => {
    workData = data.split("\n").map<Section[]>((pairData) => {
      const elfData = pairData
        .split(",")
        .map((elfData) => elfData.split("-").map((num) => +num));
      return [
        { start: elfData[0][0], end: elfData[0][1] },
        { start: elfData[1][0], end: elfData[1][1] },
      ];
    });
  });

  it("1", () => {
    let fullOverlaps = 0;
    workData.forEach((pair) => {
      if (fullOverlap(pair[0], pair[1])) {
        fullOverlaps += 1;
      }
    });
    console.log(fullOverlaps);
  });

  it("2", () => {
    let anyOverlaps = 0;
    workData.forEach((pair) => {
      if (anyOverlap(pair[0], pair[1])) {
        anyOverlaps += 1;
      }
    });
    console.log(anyOverlaps);
  });
});
