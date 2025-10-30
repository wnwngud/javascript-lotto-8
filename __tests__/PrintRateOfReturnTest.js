import { printRateOfReturn } from "../src/App";
import { MissionUtils } from "@woowacourse/mission-utils";

const getLogSpy = () => {
    const logSpy = jest.spyOn(MissionUtils.Console, "print");
    logSpy.mockClear();
    return logSpy;
};

const runAnswer = (coin, totalReturn) => {
    const logSpy = getLogSpy();
    printRateOfReturn(coin, totalReturn);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("총 수익률은 101.1%"))
}

describe.each([
    [10000, 10110]
])("printRateOfReturn(%s, %s)", (coin, totalReturn) => {
    it("총 수익률 계산 테스트", () => { runAnswer(coin, totalReturn); })
});

