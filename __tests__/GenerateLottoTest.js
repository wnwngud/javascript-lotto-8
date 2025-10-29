import { generateLotto } from "../src/App";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockRandoms = (numbers) => {
    MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
    numbers.reduce((acc, number) => {
        return acc.mockReturnValueOnce(number);
    }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const ANSWER = [
    [6, 25, 26, 36, 37, 39],
    [2, 16, 20, 36, 37, 40],
    [7, 12, 26, 27, 29, 30],
    [15, 24, 26, 27, 29, 44],
    [14, 16, 19, 28, 43, 44],
    [4, 6, 28, 37, 39, 40],
    [2, 18, 25, 30, 41, 45],
    [5, 13, 24, 36, 40, 45]
];

const RANDOM_NUMS = [
    [39, 37, 26, 36, 25, 6],
    [2, 40, 20, 36, 37, 16],
    [27, 12, 30, 7, 29, 26],
    [15, 27, 44, 24, 29, 26],
    [16, 14, 19, 28, 44, 43],
    [4, 6, 28, 37, 40, 39],
    [18, 2, 30, 25, 41, 45],
    [5, 13, 24, 36, 40, 45]
];

describe.each([
    [8]
])("generateLottos(%s)", (count) => {
    it("로또 생성 검사", () => {
        mockRandoms(RANDOM_NUMS);
        expect(generateLotto(count)).toEqual(ANSWER);
    });
});