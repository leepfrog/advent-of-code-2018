export class Frequencer {
  intSequence: number[];
  maxAttempts: number;

  constructor(strSequence: string[]) {
    this.intSequence = strSequence.map(x => Number(x));
    this.maxAttempts = 999999;
  }

  sum() {
    return this.intSequence.reduce(this._reduceSum, 0);
  }

  findResonance() {
    const length = this.intSequence.length;
    let cursor = 0;
    let total = 0;
    let results = [0];

    while (cursor < this.maxAttempts) {
      let index = cursor % length;
      let num = this.intSequence[index];
      total += num;

      if (results.indexOf(total) !== -1) {
        return total;
      }

      results.push(total);
      cursor++;
    }

    throw new Error(
      "Unable to find a number to satisfy the criteria before hitting maximum attempts"
    );
  }

  _reduceSum(total: number, num: number) {
    return total + num;
  }
}
