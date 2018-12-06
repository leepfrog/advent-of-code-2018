import { Frequencer } from "../src/frequencer";

const should = require("chai").should(); // eslint-disable-line
const expect = require("chai").expect;

describe("Frequencer", () => {
  describe("constructor", () => {
    it("should initialize intSequence properly", () => {
      const given = ["1", "2"];
      const expected = [1, 2];
      const actual = new Frequencer(given).intSequence;

      expected.should.deep.equal(actual);
    });
  });

  describe("sum", () => {
    let frequencer: Frequencer;

    beforeEach(() => {
      frequencer = new Frequencer([]);
    });

    it("should return the sum of intSequence", () => {
      const given = [1, 5, -3];
      const expected = 3;

      frequencer.intSequence = given;
      let actual = frequencer.sum();

      expected.should.equal(actual);
    });

    it("should return 0 when intSequence is empty", () => {
      const given: string[] = [];
      const expected = 0;
      const actual = new Frequencer(given).sum();

      expected.should.equal(actual);
    });
  });

  describe("findResonance", () => {
    let frequencer: Frequencer;

    beforeEach(() => {
      frequencer = new Frequencer([]);
    });

    it("should pass given positive scenario 1", () => {
      const given = [1, -1];
      const expected = 0;

      frequencer.intSequence = given;
      const actual = frequencer.findResonance();

      expected.should.equals(actual);
    });

    it("should pass given positive scenario 2", () => {
      const given = [3, 3, 4, -2, -4];
      const expected = 10;

      frequencer.intSequence = given;
      const actual = frequencer.findResonance();

      expected.should.equals(actual);
    });

    it("should pass given positive scenario 3", () => {
      const given = [-6, 3, 8, 5, -6];
      const expected = 5;

      frequencer.intSequence = given;
      const actual = frequencer.findResonance();

      expected.should.equals(actual);
    });

    it("should pass given positive scenario 4", () => {
      const given = [7, 7, -2, -7, -4];
      const expected = 14;

      frequencer.intSequence = given;
      const actual = frequencer.findResonance();

      expected.should.equals(actual);
    });

    it("should pass given positive scenario 5", () => {
      const given = [1, -2, 3, 1];
      const expected = 2;

      frequencer.intSequence = given;
      const actual = frequencer.findResonance();

      expected.should.equals(actual);
    });

    it("should fail after the specified number of max attempts", () => {
      const given = [1];

      frequencer.intSequence = given;
      frequencer.maxAttempts = 3;

      expect(frequencer.findResonance).to.throw();
    });
  });
});
