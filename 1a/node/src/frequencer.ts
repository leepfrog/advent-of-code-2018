export class Frequencer {
  intSequence: number[];

  constructor(strSequence: string[]) {
    this.intSequence = strSequence.map(x => Number(x));
  }

  sum() {
    return this.intSequence.reduce(this.reduceSum, 0);
  }

  reduceSum(total: number, num: number) {
    return total + num;
  }
}
