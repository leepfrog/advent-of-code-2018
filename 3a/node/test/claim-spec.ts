import { Claim } from "../src/claim";

const should = require("chai").should(); // eslint-disable-line
const expect = require("chai").expect;

describe("Claim", () => {
  describe("constructor", () => {
    it("should initialize with a string format of #<num> @ <x>,<y>: <width>x<height> (ex 1)", () => {
      const given = "#1 @ 108,350: 22x29";
      const claim = new Claim(given);

      claim.id.should.equal(1);
      claim.xPos.should.equal(108);
      claim.yPos.should.equal(350);
      claim.width.should.equal(22);
      claim.height.should.equal(29);
    });
    it("should initialize with a string format of #<num> @ <x>,<y>: <width>x<height> (ex 2)", () => {
      const given = "#2 @ 370,638: 13x12";
      const claim = new Claim(given);

      claim.id.should.equal(2);
      claim.xPos.should.equal(370);
      claim.yPos.should.equal(638);
      claim.width.should.equal(13);
      claim.height.should.equal(12);
    });
    it("should throw when configuration is not parsable", () => {
      const given = "abckdflj";
      expect(() => new Claim(given)).to.throw();
    });
  });

  describe("left", () => {
    it("returns xPos", () => {
      let claim = new Claim("#1 @ 5,10: 12x14");
      let expected = 5;
      let actual = claim.left();

      actual.should.equal(expected);
    });
  });
  describe("right", () => {
    it("returns xPos + width", () => {
      let claim = new Claim("#1 @ 5,10: 12x14");
      let expected = 16;
      let actual = claim.right();

      actual.should.equal(expected);
    });
  });
  describe("top", () => {
    it("returns yPos", () => {
      let claim = new Claim("#1 @ 5,10: 12x14");
      let expected = 10;
      let actual = claim.top();

      actual.should.equal(expected);
    });
  });
  describe("bottom", () => {
    it("returns yPos + height", () => {
      let claim = new Claim("#1 @ 5,10: 12x14");
      let expected = 23;
      let actual = claim.bottom();

      actual.should.equal(expected);
    });
  });

  describe("containsPoint", () => {
    let claim: Claim;

    beforeEach(() => {
      claim = new Claim("#1 @ 5,5: 10x10");
    });

    it("returns true if it contains the xPos/yPos", () => {
      const test = claim.containsPoint(6, 6);

      test.should.equals(true);
    });
    it("returns false if it doesn't contain the xPos/yPos", () => {
      const test1 = claim.containsPoint(4, 6);
      const test2 = claim.containsPoint(6, 4);

      test1.should.equal(false);
      test2.should.equal(false);
    });
    it("returns true if it is on the exact xPos/yPos point", () => {
      const test1 = claim.containsPoint(5, 5);
      const test2 = claim.containsPoint(14, 14);

      test1.should.equals(true);
      test2.should.equals(true);
    });
  });
});
