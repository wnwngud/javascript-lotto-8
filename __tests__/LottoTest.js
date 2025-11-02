import Lotto from "../src/Lotto";
import { MissionUtils } from "@woowacourse/mission-utils";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      const NUMS = [1, 2, 3, 4, 5, 5];
      const NUMS_SET = new Set(NUMS);
      new Lotto([...NUMS_SET]);
    }).toThrow("[ERROR] 로또 번호는 6개여야 합니다.");
  });

});

// TODO: 추가 기능 구현에 따른 테스트 코드 작성
const LOTTO_TEST = new Lotto([1, 2, 3, 4, 5, 6]);

// 로또 당첨 내역 계산 기능 테스트
const TEST_TABLE = [
  [[1, 2, 3, 7, 8, 9], [0, 0, 0, 0, 0], 7, 0], // 3개 일치
  [[1, 2, 3, 4, 7, 8], [0, 0, 0, 0, 0], 7, 1], // 4개 일치
  [[1, 2, 3, 4, 5, 8], [0, 0, 0, 0, 0], 7, 2], // 5개 일치
  [[1, 2, 3, 4, 5, 7], [0, 0, 0, 0, 0], 7, 3], // 5개, 보너스 볼 일치
  [[1, 2, 3, 4, 5, 6], [0, 0, 0, 0, 0], 7, 4]  // 6개 일치
]
const matchThree = (lotto, matchCount, bonusNumber) => {
  LOTTO_TEST.getHowManyMatch(lotto, matchCount, bonusNumber);
  expect(matchCount).toEqual([1, 0, 0, 0, 0]);
};

const matchFour = (lotto, matchCount, bonusNumber) => {
  LOTTO_TEST.getHowManyMatch(lotto, matchCount, bonusNumber);
  expect(matchCount).toEqual([0, 1, 0, 0, 0]);
};

const matchFive = (lotto, matchCount, bonusNumber) => {
  LOTTO_TEST.getHowManyMatch(lotto, matchCount, bonusNumber);
  expect(matchCount).toEqual([0, 0, 1, 0, 0]);
};

const matchFiveWithBonusNumber = (lotto, matchCount, bonusNumber) => {
  LOTTO_TEST.getHowManyMatch(lotto, matchCount, bonusNumber);
  expect(matchCount).toEqual([0, 0, 0, 1, 0]);
};

const matchSix = (lotto, matchCount, bonusNumber) => {
  LOTTO_TEST.getHowManyMatch(lotto, matchCount, bonusNumber);
  expect(matchCount).toEqual([0, 0, 0, 0, 1]);
};

describe.each(TEST_TABLE)("Lotto.getHowManyMatch(%s)", (lotto, matchCount, bonusNumber, caseNumber) => {
  if (caseNumber === 0) it("로또 당첨 내역 계산 기능 테스트: 3개",
    () => { matchThree(lotto, matchCount, bonusNumber); });
  if (caseNumber === 1) it("로또 당첨 내역 계산 기능 테스트: 4개",
    () => { matchFour(lotto, matchCount, bonusNumber); });
  if (caseNumber === 2) it("로또 당첨 내역 계산 기능 테스트: 5개",
    () => { matchFive(lotto, matchCount, bonusNumber); });
  if (caseNumber === 3) it("로또 당첨 내역 계산 기능 테스트: 5개 + 보너스 번호",
    () => { matchFiveWithBonusNumber(lotto, matchCount, bonusNumber); });
  if (caseNumber === 4) it("로또 당첨 내역 계산 기능 테스트: 6개",
    () => { matchSix(lotto, matchCount, bonusNumber); });
});

// 당첨 통계 출력 테스트
const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const LOGS = [
  "3개 일치 (5,000원) - 1개",
  "4개 일치 (50,000원) - 1개",
  "5개 일치 (1,500,000원) - 1개",
  "5개 일치, 보너스 볼 일치 (30,000,000원) - 1개",
  "6개 일치 (2,000,000,000원) - 1개",
]

const LOTTOS = [
  [1, 2, 3, 7, 8, 9], // 3개 일치
  [1, 2, 3, 4, 7, 8], // 4개 일치
  [1, 2, 3, 4, 5, 8], // 5개 일치
  [1, 2, 3, 4, 5, 7], // 5개, 보너스 볼 일치
  [1, 2, 3, 4, 5, 6]  // 6개 일치
];

const runAnswer = async (lottos, bonusNumber) => {
  const logSpy = getLogSpy();

  LOTTO_TEST.printWinningResult(lottos, bonusNumber);

  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(LOGS));
};

describe.each([
  [LOTTOS, 7]
])("printWinningResults(%s, %s)", (lottos, bonusNumber) => {
  it("당첨 통계 출력 테스트", () => {
    expect(() => { runAnswer(lottos, bonusNumber); });
  });
});