import fs from "fs";
import { Frequencer } from "./frequencer";

main();

function main() {
  if (process.argv.length !== 3) {
    console.error("Usage: npm run puzzle_1b <input_file>");
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
  const frequencer = new Frequencer(strSequence);
  console.log(`The result total is: ${frequencer.sum()}`);
  console.log(
    `The first frequency hit twice is: ${frequencer.findResonance()}`
  );
}
