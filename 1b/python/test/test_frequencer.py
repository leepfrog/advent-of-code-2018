import unittest
import puzzle_1b.frequencer
from puzzle_1b.frequencer import Frequencer


class TestFrequencer(unittest.TestCase):
    def test_it_parses_string_to_int(self):
        given = ['+1', '+2', '-3']
        expected = [1, 2, -3]
        actual = Frequencer(given).int_sequence
        self.assertEqual(expected, actual)

    def test_it_has_none_when_parsing_fails(self):
        given = ['~1', '+2', '-3']
        with self.assertRaises(ValueError):
            Frequencer(given)

    def test_it_returns_the_correct_sum(self):
        given = ['-1', '-2', '+6']
        expected = 3
        actual = Frequencer(given).sum()
        self.assertEqual(expected, actual)

    def test_find_resonance_pass_scenario_1(self):
        given = [1, -1]
        expected = 0
        frequencer = Frequencer([])

        frequencer.int_sequence = given
        actual = frequencer.find_resonance()

        self.assertEqual(expected, actual)

    def test_find_resonance_pass_scenario_2(self):
        given = [3, 3, 4, -2, -4]
        expected = 10
        frequencer = Frequencer([])

        frequencer.int_sequence = given
        actual = frequencer.find_resonance()

        self.assertEqual(expected, actual)

    def test_find_resonance_pass_scenario_3(self):
        given = [-6, 3, 8, 5, -6]
        expected = 5
        frequencer = Frequencer([])

        frequencer.int_sequence = given
        actual = frequencer.find_resonance()

        self.assertEqual(expected, actual)

    def test_find_resonance_pass_scenario_4(self):
        given = [7, 7, -2, -7, -4]
        expected = 14
        frequencer = Frequencer([])

        frequencer.int_sequence = given
        actual = frequencer.find_resonance()

        self.assertEqual(expected, actual)

    def test_find_resonance_pass_scenario_5(self):
        given = [1, -2, 3, 1]
        expected = 2
        frequencer = Frequencer([])

        frequencer.int_sequence = given
        actual = frequencer.find_resonance()

        self.assertEqual(expected, actual)

    def test_find_resonance_should_fail_after_max_attempts(self):
        given = [1]
        frequencer = Frequencer([])

        frequencer.int_sequence = given
        frequencer.max_attempts = 3

        with self.assertRaises(OverflowError):
            frequencer.find_resonance()
