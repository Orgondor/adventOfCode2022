import { data, testData } from "./inputData";

const idAfterDistinctLetters = (data: string, distinct: number) => {
  const workData = [...data];
  let startBuffer: string[] = [];
  let startIndex = 0;
  workData.some((letter, i) => {
    if (!startBuffer.includes(letter)) {
      startBuffer.push(letter);

      if (startBuffer.length >= distinct) {
        startIndex = i + 1;
      }
    } else {
      const duplicateId = startBuffer.indexOf(letter);
      startBuffer = startBuffer.slice(duplicateId + 1);
      startBuffer.push(letter);
    }
    return !!startIndex;
  });
  return startIndex;
};

describe("day ", () => {
  it("1", () => {
    console.log(idAfterDistinctLetters(data, 4));
  });

  it("2", () => {
    console.log(idAfterDistinctLetters(data, 14));
  });
});
