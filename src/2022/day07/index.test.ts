import { data, testData } from "./inputData";

type ElfFile = {
  name: string;
  size: number;
};

type ElfDirectory = {
  name: string;
  size: number;
  parent?: ElfDirectory;
  directories: ElfDirectory[];
  files: ElfFile[];
};

const addDirectorySize = (dir: ElfDirectory, size: number) => {
  dir.size += size;
  if (dir.parent) {
    addDirectorySize(dir.parent, size);
  }
};

const createDirectory = (
  name: string,
  parent?: ElfDirectory
): ElfDirectory => ({ name, parent, size: 0, directories: [], files: [] });

describe("day ", () => {
  let terminalOutput: string[];
  let rootDir: ElfDirectory;
  const totalSpace = 70000000;
  const neededFreeSpace = 30000000;

  beforeAll(() => {
    terminalOutput = data.split("\n");
    rootDir = createDirectory("/");
    let currentDir = rootDir;

    terminalOutput.forEach((row) => {
      const parts = row.split(" ");

      if (parts[0] === "$") {
        if (parts[1] === "cd") {
          if (parts[2] === "/") {
            currentDir = rootDir;
            return;
          }

          if (parts[2] === "..") {
            if (!currentDir.parent) {
              throw new Error("Illegal navigation");
            }
            currentDir = currentDir.parent;
            return;
          }

          const newDir = currentDir.directories.find(
            (dir) => dir.name === parts[2]
          );
          if (!newDir) {
            throw new Error("Illegal navigation");
          }
          currentDir = newDir;
          return;
        }

        if (parts[1] === "ls") {
          return;
        }

        throw new Error(`Unknown command ${parts[1]}`);
      }

      if (parts[0] === "dir") {
        currentDir.directories.push(createDirectory(parts[1], currentDir));
        return;
      }

      const size = parseInt(parts[0]);
      if (!isNaN(size)) {
        currentDir.files.push({ size, name: parts[1] });
        addDirectorySize(currentDir, size);
        return;
      }

      throw new Error(`Unknown listing ${row}`);
    });
  });

  it("1", () => {
    let sum = 0;
    const addSizes = (dir: ElfDirectory) => {
      if (dir.size <= 100000) {
        sum += dir.size;
      }

      dir.directories.forEach(addSizes);
    };

    addSizes(rootDir);

    console.log("sum of sizes:", sum);
  });

  it("2", () => {
    const currentFreeSpace = totalSpace - rootDir.size;
    const needToFree = neededFreeSpace - currentFreeSpace;

    console.log(
      "Current free space",
      currentFreeSpace,
      "Need to free",
      needToFree
    );

    let smallest = neededFreeSpace;
    let dirToDelete = rootDir;
    const findSmallest = (dir: ElfDirectory) => {
      if (dir.size >= needToFree && dir.size < smallest) {
        dirToDelete = dir;
        smallest = dir.size;
      }
      dir.directories.forEach(findSmallest);
    };

    findSmallest(rootDir);

    console.log(
      "Directory to delete:",
      dirToDelete.name,
      "size:",
      dirToDelete.size
    );
  });
});
