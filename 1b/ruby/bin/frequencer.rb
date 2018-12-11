#!/usr/bin/env ruby

$LOAD_PATH.unshift File.expand_path('../lib', __dir__)
require 'frequencer'

SOURCE_FILE = File.join(File.dirname(__FILE__), "../../data/input")
sequence    = File.open(SOURCE_FILE).readlines.map(&:chomp)

frequencer = Frequencer.new(sequence)

puts "total: #{frequencer.sum}"
puts "Frequency: #{frequencer.find_resonance}"