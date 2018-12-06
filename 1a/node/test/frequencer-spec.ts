import { Frequencer } from "../src/frequencer";

const should = require("chai").should(); // eslint-disable-line

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
    it("should return the sum of intSequence", () => {
      const given = [1, 5, -3];
      const expected = 3;

      let frequencer = new Frequencer([]);
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
});
