import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

async function insertCoin() {
  let coin = await MissionUtils.Console.readLineAsync("구입금액을 입력해 주세요.\n");

  if (validCoin(coin)) return Number(coin);
}

function validCoin(coin) {
  let num = Number(coin);

  if (coin === '' || isNaN(num) || num % 1000 != 0) {
    throw new Error("[ERROR] 1000원 단위의 숫자만 입력해 주세요.");
  }

  return true;
}

function printNumOfLotto(coin) {
  let count = coin / 1000;

  MissionUtils.Console.print(`\n${count}개를 구매했습니다.`)
  return count;
}

function generateLotto(count) {
  let lottos = [];
  let randomNums;

  for (let i = 0; i < count; i++) {
    randomNums = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    randomNums.sort((a, b) => a - b);

    MissionUtils.Console.print(randomNums);

    lottos.push(randomNums);
  }

  return lottos;
}

async function insertWinningNumbers() {
  let inputNumbers = await MissionUtils.Console.readLineAsync("\n당첨 번호를 입력해 주세요.\n");
  let strWinningNumbers = inputNumbers.split(',');
  let winningNumbers = strWinningNumbers.map(Number);

  if (validWinningNumbers(winningNumbers)) return winningNumbers;
}

function validWinningNumbers(winningNumbers) {
  for (let num of winningNumbers) {
    if (isNaN(num)) throw new Error("[ERROR] 잘못된 당첨 번호 양식입니다.");
    if (num < 1 || num > 45) throw new Error("[ERROR] 당첨 번호는 1부터 45 사이의 수만 입력해 주세요.");
  }

  return true;
}

function checkRedundancy(winningNumbers) {
  let winningNumbersSet = new Set(winningNumbers);
  return new Lotto([...winningNumbersSet]);
}

async function insertBonusNumber() {
  let inputBonusNumber = await MissionUtils.Console.readLineAsync("\n보너스 번호를 입력해 주세요.\n");

  if (validBonusNumber(inputBonusNumber)) return Number(inputBonusNumber);
}

function validBonusNumber(inputBonusNumber) {
  let numBonusNumber = Number(inputBonusNumber);

  if (inputBonusNumber === '' || isNaN(numBonusNumber) ||
    numBonusNumber < 1 || numBonusNumber > 45)
    throw new Error("[ERROR] 보너스 번호는 1부터 45 사이의 수만 입력해 주세요.");

  return true;
}

function getTotalReturn(matchCount) {
  let matchThree = matchCount[0] * 5000;
  let matchFour = matchCount[1] * 50000;
  let matchFive = matchCount[2] * 1500000;
  let matchFiveWithBonusNumber = matchCount[3] * 30000000;
  let matchSix = matchCount[4] * 2000000000;

  return matchThree + matchFour + matchFive + matchFiveWithBonusNumber + matchSix;
}

async function start() {
  const COIN = await insertCoin();
  const COUNT = printNumOfLotto(COIN);
  const LOTTOS = generateLotto(COUNT);
  const WINNING_NUMBERS = await insertWinningNumbers();
  const LOTTO_WINNING_NUMBERS = checkRedundancy(WINNING_NUMBERS);
  const BONUS_NUMBER = await insertBonusNumber();
  const MATCH_COUNT = LOTTO_WINNING_NUMBERS.printWinningResult(LOTTOS, BONUS_NUMBER);
  const TOTAL_RETURN = getTotalReturn(MATCH_COUNT);
}

class App {
  async run() {
    try { await start() }
    catch (err) { MissionUtils.Console.print(err.message); }
  }
}

export { App, validCoin, generateLotto, insertWinningNumbers, insertBonusNumber, getTotalReturn };
