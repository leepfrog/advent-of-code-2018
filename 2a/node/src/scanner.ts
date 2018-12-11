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
