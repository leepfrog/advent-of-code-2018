class Frequencer

  attr_reader :sequence
  attr_accessor :max_attempts

  def initialize(sequence)
    @sequence = parse_sequence(sequence)
    @max_attempts = 999999
  end

  def count
    return nil if @sequence.nil?

    @sequence.count
  end

  def sum
    return nil if @sequence.nil? 

    @sequence.sum
  end

  def find_resonance
    cursor = 0
    total = 0
    sums = { 0 => nil}
    length = self.sequence.count

    while cursor < self.max_attempts
      index = cursor % length
      number = self.sequence[index]
      total += number

      if sums.has_key?(total)
        return total
      end

      sums[total] = nil
      cursor += 1
    end

    raise RangeError, "Exceeded number of attempts"
  end

  private

  def parse_sequence(sequence)
    parsed_sequence = sequence.map do |e| 
      begin 
        Integer(e) 
      rescue ArgumentError 
        nil
      end 
    end

    return parsed_sequence.include?(nil) ? nil : parsed_sequence
  end

end