if __name__ == "__main__":

    import sys
    from frequencer import Frequencer

    if len(sys.argv) != 2:
        print('Usage: python puzzle_1a <file_path>')
        exit(1)

    path = sys.argv[1]
    str_sequence = open(path).readlines()
    frequencer = Frequencer(str_sequence)
    print(f'The total is: {frequencer.sum()}')
