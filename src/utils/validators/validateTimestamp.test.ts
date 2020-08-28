import validateTimestamp from "./validateTimestamp";

describe("validateTimestamp should be false if timestamp contains", () => {
    test("month with more or less than two characters", () => {
        const lessTwoCharactersMonth = "2020-4-12 12:43:12";
        expect(validateTimestamp(lessTwoCharactersMonth)).toBe(false);
        const moreTwoCharactersMonth = "2020-004-12 12:43:12";
        expect(validateTimestamp(moreTwoCharactersMonth)).toBe(false);
    });
    test("day with more or less than two characters", () => {
        const lessTwoCharactersDay = "2020-04-1 12:43:12";
        expect(validateTimestamp(lessTwoCharactersDay)).toBe(false);
        const moreTwoCharactersDay = "2020-04-001 12:43:12";
        expect(validateTimestamp(moreTwoCharactersDay)).toBe(false);
    });
    test("year with more or less than four characters", () => {
        const lessFourCharactersYear = "20-04-01 12:43:12";
        expect(validateTimestamp(lessFourCharactersYear)).toBe(false);
        const moreFourCharactersYear = "20200-04-01 12:43:12";
        expect(validateTimestamp(moreFourCharactersYear)).toBe(false);
    });
    test("wrong date format", () => {
        const dateWithSlashes = "2020/04/01 12:43:12";
        expect(validateTimestamp(dateWithSlashes)).toBe(false);
        const outOfOrderDate = "01-04-2020 12:43:12";
        expect(validateTimestamp(outOfOrderDate)).toBe(false);
    });
});

test("validateTimestamp should be true", () => {
    expect(validateTimestamp("2020-04-12 12:43:12")).toBe(true);
});
