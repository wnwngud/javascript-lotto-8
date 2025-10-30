import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from '../src/Lotto.js';

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

    const LOTTO = new Lotto([1, 2, 3, 4, 5, 6]);
    LOTTO.printWinningResult(lottos, bonusNumber);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(LOGS));
};

describe.each([
    [LOTTOS, 7]
])("printWinningResults(%s, %s)", (lottos, bonusNumber) => {
    it("당첨 통계 출력 테스트", () => {
        expect(() => { runAnswer(lottos, bonusNumber); });
    });
});

