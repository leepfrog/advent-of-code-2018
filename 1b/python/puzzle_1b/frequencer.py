class Frequencer:

    def __init__(self, str_sequence):
        self.int_sequence = list(map(int, str_sequence))
        self.max_attempts = 999999

    def sum(self):
        return sum(self.int_sequence)

    def find_resonance(self):
        cursor = 0
        total = 0
        sums = set([0])

        while cursor < self.max_attempts:
            index = cursor % len(self.int_sequence)
            number = self.int_sequence[index]
            total += number

            if total in sums:
                return total

            sums.add(total)
            cursor += 1

        raise OverflowError(
            'exceeded maximum number of attempts: {}'.format(self.max_attempts))
