import { insertBonusNumber } from "../src/App";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (input) => {
    MissionUtils.Console.readLineAsync = jest.fn();

    MissionUtils.Console.readLineAsync.mockImplementation(() => {
        return Promise.resolve(input);
    });
};

const runAnswer = async (input) => {
    mockQuestions(input);
    await expect(insertBonusNumber()).resolves.toBe(Number(input));
};

const runWrongForm = async (input) => {
    mockQuestions(input);
    await expect(insertBonusNumber()).rejects.toThrow("[ERROR] 보너스 번호는 1부터 45 사이의 수만 입력해 주세요.");
};

describe.each([
    [7, 0],
    ['', 1],
    ['7a', 1],
    [0, 2],
    [46, 2]
])("insertBonusNumber(%s)", (input, caseNumber) => {
    if (caseNumber === 0)
        it("보너스 번호 입력 테스트: 정상", async () => { runAnswer(input); });
    if (caseNumber === 1)
        it("보너스 번호 입력 테스트: 잘못된 양식", async () => { runWrongForm(input); });
    if (caseNumber === 2)
        it("보너스 번호 입력 테스트: 잘못된 숫자 범위", async () => { runWrongForm(input); });
});