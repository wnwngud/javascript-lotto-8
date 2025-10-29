import { MissionUtils } from "@woowacourse/mission-utils";

async function insertCoin() {
  let coin = await MissionUtils.Console.readLineAsync("구입 금액을 입력해 주세요.\n");

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

class App {
  async run() {
    const COIN = await insertCoin();
    const COUNT = printNumOfLotto(COIN);
  }
}

export { App, validCoin };
