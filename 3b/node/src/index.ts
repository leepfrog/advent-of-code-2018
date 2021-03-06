import fs from "fs";
import { FabricManager } from "./fabric-manager";

main();

function main() {
  if (process.argv.length !== 3) {
    console.error("Usage: npm run puzzle_3a <input_file>");
    process.exit(1);
  }

  const path = process.argv[2];

  readFileAtPath(path)
    .then(parseValueToStrSequence)
    .then(printResult);
}

function readFileAtPath(path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

function parseValueToStrSequence(value: {}) {
  if (value instanceof Buffer) {
    return value.toString("utf8").split("\n");
  }

  if (value instanceof String) {
    return value.split("\n");
  }

  throw new Error("File was not parsable");
}

function printResult(strSequence: string[]) {
  const fabricManager = new FabricManager(strSequence);
  //console.log(`The board looks like this: ${fabricManager.printDebug()}`);
  console.log(`The board width is: ${fabricManager.width()}`);
  console.log(`The board height is: ${fabricManager.height()}`);
  console.log(`The overlap is: ${fabricManager.conflictingFootage()}`);
  console.log(
    `Non-conflicting claim ids: ${fabricManager
      .nonConflictingClaims()
      .map(x => x.id)
      .join(", ")}`
  );
}
