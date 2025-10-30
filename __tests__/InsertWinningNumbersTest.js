import { insertWinningNumbers } from "../src/App";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (input) => {
    MissionUtils.Console.readLineAsync = jest.fn();

    MissionUtils.Console.readLineAsync.mockImplementation(() => {
        return Promise.resolve(input);
    });
};

const runAnswer = async (input) => {
    mockQuestions(input);
    await expect(insertWinningNumbers()).resolves.toEqual([1, 2, 3, 4, 5, 6]);
};

const runWrongForm = async (input) => {
    mockQuestions(input);
    await expect(() => insertWinningNumbers()).rejects.toThrow("[ERROR] 잘못된 당첨 번호 양식입니다.");
};

const runWrongNumber = async (input) => {
    mockQuestions(input);
    await expect(() => insertWinningNumbers()).rejects.toThrow("[ERROR] 당첨 번호는 1부터 45 사이의 수만 입력해 주세요.");
};

describe.each([
    ["1,2,3,4,5,6", 0],
    ["1a,2,3,4,5,6", 1],
    ["1,2/3,4,5,6", 1],
    ["46,1,2,3,4,5", 2]
])("insertWinningNumbers(%s)", (input, caseNumber) => {
    if (caseNumber === 0)
        it("당첨 번호 입력: 정상", async () => { runAnswer(input); });
    if (caseNumber === 1)
        it("당첨 번호 입력: 잘못된 양식 입력", async () => { runWrongForm(input); });
    if (caseNumber === 2)
        it("당첨 번호 입력: 잘못된 숫자 범위", async () => { runWrongNumber(input); });
});