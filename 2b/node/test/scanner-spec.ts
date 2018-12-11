import {
  Scanner,
  ScanResult,
  ChecksumResult,
  WordMapResult
} from "../src/scanner";

const chai = require("chai");
const spies = require("chai-spies");

chai.use(spies);
const should = chai.should(); // eslint-disable-line

describe("Scanner", () => {
  let scanner: Scanner;

  beforeEach(() => {
    scanner = new Scanner();
  });

  describe("constructor", () => {
    it("boxIds should initialize with an array", () => {
      const given = ["abc", "def"];
      const expected = given;
      const actual = new Scanner(given).sequence;

      actual.should.deep.equal(expected);
    });

    it("boxIds should initialize with a string with each id separated by newline", () => {
      const given = "abc\ndef\nhij";
      const expected = ["abc", "def", "hij"];
      const actual = new Scanner(given).sequence;

      actual.should.deep.equal(expected);
    });

    it("boxIds should initialize with a string with extra newlines ignored", () => {
      const given = "abc\ndef\n\nhij\n\n";
      const expected = ["abc", "def", "hij"];
      const actual = new Scanner(given).sequence;

      actual.should.deep.equal(expected);
    });

    it("boxIds should initialize with undefined", () => {
      const expected = <string[]>[];
      const actual = new Scanner().sequence;

      actual.should.deep.equal(expected);
    });
  });

  describe("computeScan", () => {
    it("should return false/false when no letters appear exactly two or three times", () => {
      const given = "abcdef";
      const expected = { twice: false, thrice: false };
      const actual = scanner.computeScan(given);

      actual.should.deep.equal(expected);
    });

    it("should return true/true when a single letter appears twice and thrice with separation", () => {
      const given = "bababc";
      const expected = { twice: true, thrice: true };
      const actual = scanner.computeScan(given);

      actual.should.deep.equal(expected);
    });

    it("should return true/false when a single letter appears twice together", () => {
      const given = "abbcde";
      const expected = { twice: true, thrice: false };
      const actual = scanner.computeScan(given);

      actual.should.deep.equal(expected);
    });

    it("should return false/true when a single letter appears thrice together", () => {
      const given = "abcccd";
      const expected = { twice: false, thrice: true };
      const actual = scanner.computeScan(given);

      actual.should.deep.equal(expected);
    });

    it("should return true/false when two letters appear twice separately", () => {
      const given = "aabcdd";
      const expected = { twice: true, thrice: false };
      const actual = scanner.computeScan(given);

      actual.should.deep.equal(expected);
    });

    it("should return false/true when three letters appear together separately", () => {
      const given = "ababab";
      const expected = { twice: false, thrice: true };
      const actual = scanner.computeScan(given);

      actual.should.deep.equal(expected);
    });
  });

  describe("computeChecksum", () => {
    it("returns a 0/0 for no results", () => {
      let given: ScanResult[] = [];
      let expected: ChecksumResult = { twice: 0, thrice: 0 };
      let actual = scanner.computeChecksum(given);

      actual.should.deep.equal(expected);
    });

    it("returns a 0/0 for a false/false result", () => {
      let given: ScanResult[] = [{ twice: false, thrice: false }];
      let expected: ChecksumResult = { twice: 0, thrice: 0 };
      let actual = scanner.computeChecksum(given);

      actual.should.deep.equal(expected);
    });

    it("returns a 1/1 for a true/true result", () => {
      let given: ScanResult[] = [{ twice: true, thrice: true }];
      let expected: ChecksumResult = { twice: 1, thrice: 1 };
      let actual = scanner.computeChecksum(given);

      actual.should.deep.equal(expected);
    });

    it("returns a 1/0 for a true/false result", () => {
      let given: ScanResult[] = [{ twice: true, thrice: false }];
      let expected: ChecksumResult = { twice: 1, thrice: 0 };
      let actual = scanner.computeChecksum(given);

      actual.should.deep.equal(expected);
    });

    it("returns a 2/0 for multiple true/false results", () => {
      let given: ScanResult[] = [
        { twice: true, thrice: false },
        { twice: true, thrice: false }
      ];
      let expected: ChecksumResult = { twice: 2, thrice: 0 };
      let actual = scanner.computeChecksum(given);

      actual.should.deep.equal(expected);
    });

    it("returns a 0/1 for a false/true result", () => {
      let given: ScanResult[] = [{ twice: false, thrice: true }];
      let expected: ChecksumResult = { twice: 0, thrice: 1 };
      let actual = scanner.computeChecksum(given);

      actual.should.deep.equal(expected);
    });

    it("returns a 0/2 for multiple false/true results", () => {
      let given: ScanResult[] = [
        { twice: false, thrice: true },
        { twice: false, thrice: true }
      ];
      let expected: ChecksumResult = { twice: 0, thrice: 2 };
      let actual = scanner.computeChecksum(given);

      actual.should.deep.equal(expected);
    });

    describe("compareWordDifference", () => {
      it("returns the number of letters that differ between the two strings", () => {
        let given = ["aaa", "aba"];
        let expected = 1;
        let actual = scanner.compareWordDifference(given[0], given[1]);

        actual.should.be.equal(expected);
      });

      it("returns the number of letters that differ when strings are completely different", () => {
        let given = ["abc", "xyz"];
        let expected = 3;
        let actual = scanner.compareWordDifference(given[0], given[1]);

        actual.should.be.equal(expected);
      });

      it("works with different string lengths", () => {
        let given = ["aabc", "abbcdefg"];
        let expected = 5;
        let actual = scanner.compareWordDifference(given[0], given[1]);

        actual.should.be.equal(expected);
      });
    });

    describe("findLowestPartner", () => {
      it("returns min -1, index -1 if there is only exact matches", () => {
        let given = ["a", "a"];
        let expected: WordMapResult = { min: -1, source: 0, target: -1 };
        let actual = scanner.findLowestPartner(given[0], 0, given);

        actual.should.deep.equal(expected);
      });

      it("ignores exact matches to find only close matches", () => {
        let given = ["ab", "ab", "ab", "ac"];
        let expected: WordMapResult = { min: 1, source: 0, target: 3 };
        let actual = scanner.findLowestPartner(given[0], 0, given);

        actual.should.deep.equal(expected);
      });
    });
  });

  describe("integration", () => {
    describe("sequenceChecksum", () => {
      let scanner: Scanner;

      beforeEach(() => {
        scanner = new Scanner();
      });

      it("calls computeScan with the values from sequence", () => {
        const given = ["hello", "world"];
        let spy = chai.spy.on(scanner, "computeScan");

        scanner.sequence = given;
        scanner.sequenceChecksum();

        spy.should.have.been.first.called.with("hello");
        spy.should.have.been.second.called.with("world");
      });

      it("calls computeChecksum with the values from computeScan", () => {
        const given = ["aabcd", "aaabcd"];
        let spy = chai.spy.on(scanner, "computeChecksum");

        scanner.sequence = given;
        scanner.sequenceChecksum();

        spy.should.have.been.first.called.with([
          { twice: true, thrice: false },
          { twice: false, thrice: true }
        ]);
      });

      it("returns the checksum calculation: <uniq_twice> * <uniq_thrice>", () => {
        const given = ["aa", "aa", "ccc", "ccc", "ccc"]; // 2 * 3
        let expected = 6;

        scanner.sequence = given;
        let actual = scanner.sequenceChecksum();

        actual.should.be.equal(expected);
      });

      it("matches the given input from the puzzle website", () => {
        const given = [
          "abcdef",
          "bababc",
          "abbcde",
          "abcccd",
          "aabcdd",
          "abcdee",
          "ababab"
        ];
        let expected = 12;

        scanner.sequence = given;
        let actual = scanner.sequenceChecksum();

        actual.should.be.equal(expected);
      });
    });

    describe("sequenceSorted", () => {
      let scanner: Scanner;

      beforeEach(() => {
        scanner = new Scanner();
      });

      it("returns the sequence sorted by commonality", () => {
        let given = [
          "abcde",
          "fghij",
          "klmno",
          "pqrst",
          "fguij",
          "axcye",
          "wvxyz"
        ];
        let expected = "fghij fguij";

        scanner.sequence = given;
        let actual = scanner.findClosest();

        expected.should.be.equal(actual);
      });
    });
  });
});
