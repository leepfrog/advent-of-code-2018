export class Scanner {
  sequence: string[];

  constructor(input?: string[] | string) {
    if (typeof input === "string") {
      input = input.split("\n").filter(x => x != "");
    }

    if (typeof input === "undefined") {
      input = [];
    }

    this.sequence = input;
  }

  sequenceChecksum(): number {
    let scanResults = this.sequence.map(this.computeScan);
    let checksum = this.computeChecksum(scanResults);

    return checksum.twice * checksum.thrice;
  }

  findClosest() {
    let mappedPartners = this.sequence
      .map((word, index) => {
        return this.findLowestPartner(word, index, this.sequence);
      })
      .sort((a, b) => {
        return a.min - b.min;
      });

    if (mappedPartners.length > 0) {
      let map = mappedPartners[0];
      let name1 = this.sequence[map.source];
      let name2 = this.sequence[map.target];

      return `${name1} ${name2}`;
    }
  }

  computeChecksum(results: ScanResult[]): ChecksumResult {
    return {
      twice: results.filter(x => x.twice).length,
      thrice: results.filter(x => x.thrice).length
    };
  }

  computeScan(id: string): ScanResult {
    let letterCount = id.split("").reduce<any>((result, letter) => {
      result[letter] = result[letter] ? result[letter] + 1 : 1;

      return result;
    }, {});

    return {
      twice: Object.values(letterCount).includes(2),
      thrice: Object.values(letterCount).includes(3)
    };
  }

  findLowestPartner(
    search: string,
    source: number,
    sequence: string[]
  ): WordMapResult {
    let min = -1;
    let target = -1;

    sequence.forEach((word, cursor) => {
      let difference = this.compareWordDifference(search, word);

      if (difference == 0) {
        return;
      }

      if (min == -1 || difference < min) {
        min = difference;
        target = cursor;
      }
    });

    return { min, source, target };
  }

  compareWordDifference(a: string, b: string): number {
    let differenceCount = a.split("").reduce((result, letter, index) => {
      if (letter !== b[index]) {
        result += 1;
      }

      return result;
    }, 0);

    if (a.length !== b.length) {
      differenceCount += Math.abs(a.length - b.length);
    }

    return differenceCount;
  }
}

export interface ScanResult {
  // Did a letter appear exactly two times?
  twice: boolean;

  // Did a letter appear exactly three times?
  thrice: boolean;
}

export interface ChecksumResult {
  // How many times did a result exclusively contain twice => true
  twice: number;

  // How many times did a result exclusively contain thrice => true
  thrice: number;
}

export interface WordMapResult {
  // The lowest match against results
  min: number;

  // The index for the lowest matched result (first found)
  source: number;

  // The index for the lowest matched result (first found)
  target: number;
}
