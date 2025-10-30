import Lotto from '../src/Lotto.js';

const LOTTO_TEST = new Lotto([1, 2, 3, 4, 5, 6]);

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
})