import { validCoin } from "../src/App.js"

describe.each([
    [1000, 0],
    ['', 1],
    ['abc', 2],
    ['100a', 2],
    [1005, 3]
])("validCoin(%s)", (coin, caseNumber) => {
    if (caseNumber === 0)
        it("금액 입력 양식 검사: 정상", () => { expect(validCoin(coin)).toBe(true); });
    if ([1, 2, 3].includes(caseNumber))
        it("금액 입력 양식 검사: 비정상 입력", () => {expect(()=> validCoin(coin)).toThrow("[ERROR] 1000원 단위의 숫자만 입력해 주세요.")})
});