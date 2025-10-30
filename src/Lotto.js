class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  // TODO: 추가 기능 구현
  getHowManyMatch(lotto, matchCount, bonusNumber) {
    let matchNums = lotto.filter(it => this.#numbers.includes(it));
    let matchLength = matchNums.length;
    let haveBonusNumber = lotto.includes(bonusNumber);

    if (matchLength === 6) matchCount[4] += 1;
    else if (matchLength === 5 && haveBonusNumber) matchCount[3] += 1;
    else if (matchLength === 5) matchCount[2] += 1;
    else if (matchLength === 4) matchCount[1] += 1;
    else if (matchLength === 3) matchCount[0] += 1;
  }
}

export default Lotto;
