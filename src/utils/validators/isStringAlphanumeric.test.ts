import isStringAlphanumeric from "./isStringAlphanumeric";

describe("isStringAlphanumeric should be false because", () => {
    test("string contains -", () => {
        const stringWithDash = "dash-h";
        expect(isStringAlphanumeric(stringWithDash)).toBe(false);
    });
    test("string contains white space", () => {
        const stringWithWhitespace = "white space";
        expect(isStringAlphanumeric(stringWithWhitespace)).toBe(false);
    });
    test("string contains %", () => {
        const stringWithPercentage = "percentage%";
        expect(isStringAlphanumeric(stringWithPercentage)).toBe(false);
    });
    test("string contains ( or )", () => {
        const onlyLeftParenthesis = "(left";
        expect(isStringAlphanumeric(onlyLeftParenthesis)).toBe(false);
        const onlyRightParenthesis = "right)";
        expect(isStringAlphanumeric(onlyRightParenthesis)).toBe(false);
        const bothParenthesis = "(both)";
        expect(isStringAlphanumeric(bothParenthesis)).toBe(false);
    });
});

describe("isStringAlphanumeric should be true if input", () => {
    test("contains only digits", () => {
        const onlyDigits = "12345";
        expect(isStringAlphanumeric(onlyDigits)).toBe(true);
    });
    test("contains only letters", () => {
        const onlyLetters = "abcd";
        expect(isStringAlphanumeric(onlyLetters)).toBe(true);
    });
    test("contains both letters and digits", () => {
        const lettersAndDigits = "abc12d";
        expect(isStringAlphanumeric(lettersAndDigits)).toBe(true);
    });
    test("is empty", () => {
        const emptyString = "";
        expect(isStringAlphanumeric(emptyString)).toBe(true);
    });
});
