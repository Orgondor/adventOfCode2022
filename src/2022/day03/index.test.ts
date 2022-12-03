import { sum } from "../util";
import { data, testData } from "./inputData";

describe("day ", () => {
  const ruckSacks1: string[][] = [];
  let duplicateItems: string[];
  const aValue = Buffer.from("a").readUInt8();
  const AValue = Buffer.from("A").readUInt8();
  const ZValue = Buffer.from("Z").readUInt8();

  const ruckSacks2: string[][] = [];
  let groupItems: string[];

  const itemToPriority = (item) => {
    const rawValue = Buffer.from(item).readUInt8();
    if (rawValue > ZValue) {
      return rawValue - aValue + 1;
    }
    return rawValue - AValue + 1 + 26;
  };

  beforeAll(() => {
    data.split("\n").forEach((sack, i) => {
      ruckSacks1.push([
        sack.slice(0, sack.length / 2),
        sack.slice(sack.length / 2),
      ]);
      if (i % 3 === 0) {
        ruckSacks2.push([sack]);
      } else {
        ruckSacks2[Math.floor(i / 3)].push(sack);
      }
    });
    duplicateItems = ruckSacks1.map((sack) => {
      let duplicate = "";
      [...sack[0]].some((item) => {
        duplicate = item;
        return sack[1].includes(item);
      });
      return duplicate;
    });

    groupItems = ruckSacks2.map((sack) => {
      let groupItem = "";
      [...sack[0]].some((item) => {
        groupItem = item;
        return sack[1].includes(item) && sack[2].includes(item);
      });
      return groupItem;
    });
  });

  it("1", () => {
    const values = duplicateItems.map(itemToPriority);
    console.log("Value sum:", sum(...values));
  });

  it("2", () => {
    const values = groupItems.map(itemToPriority);
    console.log("Value sum:", sum(...values));
  });
});
