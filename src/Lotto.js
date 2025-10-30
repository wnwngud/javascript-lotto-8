import { MissionUtils } from "@woowacourse/mission-utils";

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

  printWinningResult(lottos, bonusNumber) {
    let matchCount = Array.from({ length: 5 }, () => 0);

    for (let i = 0; i < lottos.length; i++) this.getHowManyMatch(lottos[i], matchCount, bonusNumber);

    MissionUtils.Console.print("\n당첨 통계\n---");
    MissionUtils.Console.print(`3개 일치 (5,000원) - ${matchCount[0]}개`);
    MissionUtils.Console.print(`4개 일치 (50,000원) - ${matchCount[1]}개`);
    MissionUtils.Console.print(`5개 일치 (1,500,000원) - ${matchCount[2]}개`);
    MissionUtils.Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${matchCount[3]}개`);
    MissionUtils.Console.print(`6개 일치 (2,000,000,000원) - ${matchCount[4]}개`);

    return matchCount;
  }
}

export default Lotto;
