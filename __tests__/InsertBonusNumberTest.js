import { insertBonusNumber } from "../src/App";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (input) => {
    MissionUtils.Console.readLineAsync = jest.fn();

    MissionUtils.Console.readLineAsync.mockImplementation(() => {
        return Promise.resolve(input);
    });
};

const TEST_WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];

const runAnswer = async (input) => {
    mockQuestions(input);
    await expect(insertBonusNumber(TEST_WINNING_NUMBERS)).resolves.toBe(Number(input));
};

const runWrongForm = async (input) => {
    mockQuestions(input);
    await expect(insertBonusNumber(TEST_WINNING_NUMBERS)).rejects.toThrow("[ERROR] 보너스 번호는 1부터 45 사이의 수만 입력해 주세요.");
};

const runDuplicatedNum = async (input) => {
    mockQuestions(input);
    await expect(insertBonusNumber(TEST_WINNING_NUMBERS)).rejects.toThrow("[ERROR] 보너스 번호는 당첨 번호와 중복되지 않는 수를 입력해 주세요.");
};

const TEST_INPUT = [
    [7, 0],
    ['', 1],
    ['7a', 1],
    [0, 2],
    [46, 2],
    [6, 3]
];

describe.each(
    TEST_INPUT
)("insertBonusNumber(%s)", (input, caseNumber) => {
    if (caseNumber === 0)
        it("보너스 번호 입력 테스트: 정상", async () => { runAnswer(input); });
    else if (caseNumber === 1)
        it("보너스 번호 입력 테스트: 잘못된 양식", async () => { runWrongForm(input); });
    else if (caseNumber === 2)
        it("보너스 번호 입력 테스트: 잘못된 숫자 범위", async () => { runWrongForm(input); });
    else if (caseNumber === 3)
        it("보너스 번호 입력 테스트: 중복된 숫자", async () => { runDuplicatedNum(input); });
});