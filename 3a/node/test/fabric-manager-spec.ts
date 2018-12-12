import { FabricManager } from "../src/fabric-manager";
import { Claim } from "../src/claim";

const should = require("chai").should(); // eslint-disable-line

describe("FabricManager", () => {
  describe("constructor", () => {
    it("should popuplate claims with the given configurations", () => {
      const given = ["#1 @ 15,30: 100x300"];
      const expected = [new Claim(given[0])];
      const actual = new FabricManager(given).claims;

      actual.should.deep.equal(expected);
    });
  });

  describe("width", () => {
    it("returns the outer width of the claimed cuts", () => {
      const given = [
        "#1 @ 15,30: 100x300",
        "#2 @ 150,40: 10x30",
        "#3 @ 10,20: 20x20"
      ];
      const expected = 159;
      const actual = new FabricManager(given).width();

      actual.should.equal(expected);
    });
  });

  describe("height", () => {
    it("returns the outer height of the claimed cuts", () => {
      const given = [
        "#1 @ 15,30: 100x300",
        "#2 @ 150,40: 10x30",
        "#3 @ 10,20: 20x20"
      ];
      const expected = 329;
      const actual = new FabricManager(given).height();

      actual.should.equal(expected);
    });
  });

  describe("conflictingFootage", () => {
    it("returns the amount of square footage overlapping by claims", () => {
      const given = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];
      const expected = 4;
      const actual = new FabricManager(given).conflictingFootage();

      actual.should.equal(expected);
    });
  });
});
