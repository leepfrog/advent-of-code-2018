require 'frequencer'

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

end