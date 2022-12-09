import { matrixTranspose } from "../util";
import { data, testData } from "./inputData";

type Tree = {
  height: number;
  visible: boolean;
  scenicScore: number;
};

const checkEdgeVisibility = (treeRow: Tree[]) => {
  let highest = 0;
  treeRow.some((tree, i) => {
    if (i === 0 || highest < tree.height) {
      tree.visible = true;
      highest = tree.height;
    }
    return highest === 9;
  });
};

const checkRowVisibility = (treeRow: Tree[]) => {
  checkEdgeVisibility(treeRow);
  checkEdgeVisibility([...treeRow].reverse());
};

const calculateScenicScore = (
  tree: Tree,
  treeMatrix: Tree[][],
  row: number,
  col: number
) => {
  let left = 0;
  let right = 0;
  let up = 0;
  let down = 0;
  let step: number;

  if (row > 0) {
    step = row;
    while (step > 0) {
      step -= 1;
      left += 1;
      if (treeMatrix[step][col].height >= tree.height) {
        break;
      }
    }
  }

  if (row < treeMatrix[col].length - 1) {
    step = row;
    while (step < treeMatrix[col].length - 1) {
      step += 1;
      right += 1;
      if (treeMatrix[step][col].height >= tree.height) {
        break;
      }
    }
  }

  if (col > 0) {
    step = col;
    while (step > 0) {
      step -= 1;
      up += 1;
      if (treeMatrix[row][step].height >= tree.height) {
        break;
      }
    }
  }

  if (col < treeMatrix.length - 1) {
    step = col;
    while (step < treeMatrix[col].length - 1) {
      step += 1;
      down += 1;
      if (treeMatrix[row][step].height >= tree.height) {
        break;
      }
    }
  }

  tree.scenicScore = left * right * up * down;
  return tree.scenicScore;
};

describe("day 8", () => {
  let trees: Tree[][];
  let maxScore = 0;

  beforeAll(() => {
    trees = data.split("\n").map((row) =>
      [...row].map<Tree>((treeHeight) => ({
        visible: false,
        height: +treeHeight,
        scenicScore: 0,
      }))
    );

    trees.forEach((row) => {
      checkRowVisibility(row);
    });
    matrixTranspose(trees).forEach((row) => {
      checkRowVisibility(row);
    });

    trees.forEach((row, rowId) => {
      row.forEach((tree, colId) => {
        const score = calculateScenicScore(tree, trees, rowId, colId);
        if (score > maxScore) {
          maxScore = score;
        }
      });
    });
  });

  it("1", () => {
    let visible = 0;
    trees.forEach((row) => {
      row.forEach((tree) => {
        if (tree.visible) {
          visible += 1;
        }
      });
    });

    console.log("Number of visible trees:", visible);
  });

  it("2", () => {
    console.log("Max score:", maxScore);
  });
});
