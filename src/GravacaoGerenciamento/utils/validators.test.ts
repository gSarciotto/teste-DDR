import Gravacao from "../Gravacao";
import { validateGravacao } from "./validators";

const validUuid = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";
const validDataAcesso = "2020-04-12 12:34:53";

describe("validateGravacao should fail if", () => {
    test("any of the inputs is empty", () => {
        const emptyId = {
            id: "",
            telefone: "alphanumericTelefone",
            ramal: "alphanumericRamal",
            dataGravacao: validDataAcesso
        };
        expect(validateGravacao(emptyId)).toBe(false);
        const emptyTelefone = {
            id: validUuid,
            telefone: "",
            ramal: "alphanumericRamal",
            dataGravacao: validDataAcesso
        };
        expect(validateGravacao(emptyTelefone)).toBe(false);
        const emptyRamal = {
            id: validUuid,
            telefone: "alphanumericTelefone",
            ramal: "",
            dataGravacao: validDataAcesso
        };
        expect(validateGravacao(emptyRamal)).toBe(false);
        const emptyDataGravacao = {
            id: validUuid,
            telefone: "alphanumericTelefone",
            ramal: "alphanumericRamal",
            dataGravacao: ""
        };
        expect(validateGravacao(emptyDataGravacao)).toBe(false);
    });
    test("invalid uuid", () => {
        const invalidUuid = {
            id: "invalid uuid",
            telefone: "alphanumericTelefone",
            ramal: "alphanumericRamal",
            dataGravacao: validDataAcesso
        };
        expect(validateGravacao(invalidUuid)).toBe(false);
    });
    test("telefone is non alphanumeric", () => {
        const nonAlphanumericTelefone: Gravacao = {
            id: validUuid,
            telefone: "(11)933333333",
            ramal: "alphanumericRamal",
            dataGravacao: validDataAcesso
        };
        expect(validateGravacao(nonAlphanumericTelefone)).toBe(false);
    });
    test("ramal is non alphanumeric", () => {
        const nonAlphanumericRamal: Gravacao = {
            id: validUuid,
            telefone: "alphanumericTelefone",
            ramal: "2-03",
            dataGravacao: validDataAcesso
        };
        expect(validateGravacao(nonAlphanumericRamal)).toBe(false);
    });
    test("invalid dataAtendimento", () => {
        const invalidDataAtendimento: Gravacao = {
            id: validUuid,
            telefone: "alphanumericTelefone",
            ramal: "alphanumericRamal",
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
        dataGravacao: "2020-04-12 12:34:53"
    };
    expect(validateGravacao(aValidGravacao)).toBe(true);
    const anotherValidGravacao: Gravacao = {
        id: validUuid,
        telefone: "11933333333",
        ramal: "203",
        dataGravacao: "2020-04-12 12:43:01"
    };
    expect(validateGravacao(anotherValidGravacao)).toBe(true);
});
