require 'frequencer'

class Frequencer
  attr_accessor :sequence
end

RSpec.describe Frequencer do

  let(:sequence)      { ["+1", "+2", "-4"] }
  let(:bad_sequence)  { ["+1", "~2", "-4"] }
  
  before do
    @frequencer = Frequencer.new(sequence)
    @bad_frequencer = Frequencer.new(bad_sequence)
  end

  describe "#count" do
    it "should return the expected number of elements" do
      expect(@frequencer.count).to eq(3)
    end

    it "should return nil when any element is not parsable" do
      expect(@bad_frequencer.count).to be_nil
    end
  end

  describe "#sequence" do
    it "should return the parsed numeric value passed in during initialization" do
      expect(@frequencer.sequence).to eq([1, 2, -4])
    end

    it "should return nil when any element is not parsable" do
      expect(@bad_frequencer.sequence).to be_nil
    end
  end

  describe "#sum" do
    it "should return the sum of #sequence" do
      expect(@frequencer.sum).to eq(-1)
    end

    it "should return nil when any element is not parsable" do
      expect(@bad_frequencer.sum).to be_nil
    end
  end

  describe "#find_resonance" do
    it "should pass given positive scenario 1" do
      given = [1, -1];
      expected = 0;
      @frequencer.sequence = given;

      expect(@frequencer.find_resonance).to eq(expected)
    end

    it "should pass given positive scenario 2" do
      given = [3, 3, 4, -2, -4];
      expected = 10;
      @frequencer.sequence = given;

      expect(@frequencer.find_resonance).to eq(expected)
    end

    it "should pass given positive scenario 3" do
      given = [-6, 3, 8, 5, -6];
      expected = 5;
      @frequencer.sequence = given;

      expect(@frequencer.find_resonance).to eq(expected)
    end

    it "should pass given positive scenario 4" do
      given = [7, 7, -2, -7, -4];
      expected = 14;
      @frequencer.sequence = given;

      expect(@frequencer.find_resonance).to eq(expected)
    end

    it "should pass given positive scenario 5" do
      given = [1, -2, 3, 1];
      expected = 2;
      @frequencer.sequence = given;

      expect(@frequencer.find_resonance).to eq(expected)
    end

    it "should fail after the specified number of max attempts" do
      given = [1];
      @frequencer.sequence = given;
      @frequencer.max_attempts = 3;

      expect{@frequencer.find_resonance}.to raise_error(RangeError)
    end
  end

end