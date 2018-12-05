import unittest
import puzzle_1a.frequencer
from puzzle_1a.frequencer import Frequencer


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
