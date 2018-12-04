class Frequencer

  attr_reader :sequence

  def initialize(sequence)
    @sequence = parse_sequence(sequence)
  end

  def count
    return nil if @sequence.nil?

    @sequence.count
  end

  def sum
    return nil if @sequence.nil? 

    @sequence.sum
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