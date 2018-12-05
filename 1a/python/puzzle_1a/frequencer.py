class Frequencer:

    def __init__(self, str_sequence):
        self.int_sequence = list(map(int, str_sequence))

    def sum(self):
        return sum(self.int_sequence)
