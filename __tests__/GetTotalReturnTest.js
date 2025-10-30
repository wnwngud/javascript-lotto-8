import { getTotalReturn } from "../src/App";

describe.each([
    [[1, 0, 1, 0, 0]]
])("getTotalReturn(%s)", (matchCount) => {
    it("최종 수익 계산 테스트", () => {
        expect(getTotalReturn(matchCount)).toBe(1505000);
    });
});