import Gravacao from "../Gravacao";
import {
    validateGravacao,
    convertToGravacaoAndValidate,
    isGravacao
} from "./validators";

const validUuid = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";
const validTelefone = "alphanumericTelefone";
const validRamal = "alphanumericRamal";
const validDataGravacao = "2020-04-12 12:34:53";

describe("validateGravacao should fail if", () => {
    test("any of the inputs is empty", () => {
        const emptyId = {
            id: "",
            telefone: validTelefone,
            ramal: validRamal,
            dataGravacao: validDataGravacao
        };
        expect(validateGravacao(emptyId)).toBe(false);
        const emptyTelefone = {
            id: validUuid,
            telefone: "",
            ramal: validRamal,
            dataGravacao: validDataGravacao
        };
        expect(validateGravacao(emptyTelefone)).toBe(false);
        const emptyRamal = {
            id: validUuid,
            telefone: validTelefone,
            ramal: "",
            dataGravacao: validDataGravacao
        };
        expect(validateGravacao(emptyRamal)).toBe(false);
        const emptyDataGravacao = {
            id: validUuid,
            telefone: validTelefone,
            ramal: validRamal,
            dataGravacao: ""
        };
        expect(validateGravacao(emptyDataGravacao)).toBe(false);
    });
    test("invalid uuid", () => {
        const invalidUuid = {
            id: "invalid uuid",
            telefone: validTelefone,
            ramal: validRamal,
            dataGravacao: validDataGravacao
        };
        expect(validateGravacao(invalidUuid)).toBe(false);
    });
    test("telefone is non alphanumeric", () => {
        const nonAlphanumericTelefone: Gravacao = {
            id: validUuid,
            telefone: "(11)933333333",
            ramal: validRamal,
            dataGravacao: validDataGravacao
        };
        expect(validateGravacao(nonAlphanumericTelefone)).toBe(false);
    });
    test("ramal is non alphanumeric", () => {
        const nonAlphanumericRamal: Gravacao = {
            id: validUuid,
            telefone: validTelefone,
            ramal: "2-03",
            dataGravacao: validDataGravacao
        };
        expect(validateGravacao(nonAlphanumericRamal)).toBe(false);
    });
    test("invalid dataAtendimento", () => {
        const invalidDataAtendimento: Gravacao = {
            id: validUuid,
            telefone: validTelefone,
            ramal: validRamal,
            dataGravacao: "20-4-12 12:43:01"
        };
        expect(validateGravacao(invalidDataAtendimento)).toBe(false);
    });
});

test("validateGravacao should be true", () => {
    const aValidGravacao: Gravacao = {
        id: validUuid,
        telefone: "11911111111",
        ramal: "203",
        dataGravacao: validDataGravacao
    };
    expect(validateGravacao(aValidGravacao)).toBe(true);
    const anotherValidGravacao: Gravacao = {
        id: validUuid,
        telefone: "11933333333",
        ramal: "203",
        dataGravacao: validDataGravacao
    };
    expect(validateGravacao(anotherValidGravacao)).toBe(true);
});

describe("convertToGravacaoAndValidate should throw if", () => {
    test("cant convert object to Gravacao", () => {
        const invalidGravacao = {
            id: 1,
            telefone: validTelefone,
            ramal: validRamal,
            dataGravacao: validDataGravacao
        };
        expect(() => {
            convertToGravacaoAndValidate(invalidGravacao);
        }).toThrow(/Unable to convert/);
    });
    test("input is not a valid Gravacao", () => {
        const invalidGravacao = {
            id: "invalidUuid",
            telefone: validTelefone,
            ramal: validRamal,
            dataGravacao: validDataGravacao
        };
        expect(() => {
            convertToGravacaoAndValidate(invalidGravacao);
        }).toThrow(/not a valid/);
    });
});

test("should convert an object to Gravacao", () => {
    const aValidObject = {
        id: validUuid,
        telefone: validTelefone,
        ramal: validRamal,
        dataGravacao: validDataGravacao
    };
    const aValidGravacao: Gravacao = {
        id: validUuid,
        telefone: validTelefone,
        ramal: validRamal,
        dataGravacao: validDataGravacao
    };
    const result: unknown = convertToGravacaoAndValidate(aValidObject);
    expect(isGravacao(result)).toBe(true);
    expect(result).toEqual(aValidGravacao);
});
