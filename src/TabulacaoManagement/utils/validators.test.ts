import Tabulacao from "../Tabulacao";
import {
    validateTabulacao,
    convertToTabulacaoAndValidate,
    isTabulacao
} from "./validators";

const validUuid = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";

describe("validateTabulacao should be false if", () => {
    test("any of the fields is empty", () => {
        const noIdTabulacao: Tabulacao = {
            id: "",
            nomeCliente: "anyName",
            protocolo: "alphanumericProtocol",
            dataAtendimento: "2020-04-12 12:43:12",
            numeroBinado: "anyNumeroBinado",
            numeroAcesso: "anyNumeroAcesso"
        };
        expect(validateTabulacao(noIdTabulacao)).toBe(false);
        const noNomeCliente: Tabulacao = {
            id: validUuid,
            nomeCliente: "",
            protocolo: "alphanumericProtocol",
            dataAtendimento: "2020-04-12 12:43:12",
            numeroBinado: "anyNumeroBinado",
            numeroAcesso: "anyNumeroAcesso"
        };
        expect(validateTabulacao(noNomeCliente)).toBe(false);
        const noProtocolo: Tabulacao = {
            id: validUuid,
            nomeCliente: "anyNomeClient",
            protocolo: "",
            dataAtendimento: "2020-04-12 12:43:12",
            numeroBinado: "anyNumeroBinado",
            numeroAcesso: "anyNumeroAcesso"
        };
        expect(validateTabulacao(noProtocolo)).toBe(false);
        const noDataAtendimento: Tabulacao = {
            id: validUuid,
            nomeCliente: "anyNomeCliente",
            protocolo: "alphanumericProtocol",
            dataAtendimento: "",
            numeroBinado: "anyNumeroBinado",
            numeroAcesso: "anyNumeroAcesso"
        };
        expect(validateTabulacao(noDataAtendimento)).toBe(false);
        const noNumeroBinado: Tabulacao = {
            id: validUuid,
            nomeCliente: "anyNomeCliente",
            protocolo: "alphanumericProtocol",
            dataAtendimento: "2020-04-12 12:43:12",
            numeroBinado: "",
            numeroAcesso: "anyNumeroAcesso"
        };
        expect(validateTabulacao(noNumeroBinado)).toBe(false);
        const noNumeroAcesso: Tabulacao = {
            id: validUuid,
            nomeCliente: "anyNomeCliente",
            protocolo: "alphanumericProtocol",
            dataAtendimento: "2020-04-12 12:43:12",
            numeroBinado: "anyNumeroBinado",
            numeroAcesso: ""
        };
        expect(validateTabulacao(noNumeroAcesso)).toBe(false);
    });
    test("non alphanumeric character in protocol", () => {
        const noAlphanumericProtocol: Tabulacao = {
            id: validUuid,
            nomeCliente: "anyNomeCliente",
            protocolo: "no alphanumeric",
            dataAtendimento: "2020-04-12 12:43:12",
            numeroBinado: "anyNumeroBinado",
            numeroAcesso: "anyNumeroAcesso"
        };
        expect(validateTabulacao(noAlphanumericProtocol)).toBe(false);
    });
    test("invalid dataAtendimento", () => {
        const invalidDataAtendimento: Tabulacao = {
            id: validUuid,
            nomeCliente: "anyNomeCliente",
            protocolo: "alphanumericProtocol",
            dataAtendimento: "20-04-12 12:43:12",
            numeroBinado: "anyNumeroBinado",
            numeroAcesso: "anyNumeroAcesso"
        };
        expect(validateTabulacao(invalidDataAtendimento)).toBe(false);
    });
    test("invalid uuid", () => {
        const invalidUuid: Tabulacao = {
            id: "invalidUuid",
            nomeCliente: "Jõao Santos",
            protocolo: "C202004002",
            dataAtendimento: "2020-04-12 12:43:12",
            numeroBinado: "11922222222",
            numeroAcesso: "11933333333"
        };
        expect(validateTabulacao(invalidUuid)).toBe(false);
    });
});

test("validateTabulacao should be true", () => {
    const aValidTabulacao: Tabulacao = {
        id: validUuid,
        nomeCliente: "Jõao Santos",
        protocolo: "C202004002",
        dataAtendimento: "2020-04-12 12:43:12",
        numeroBinado: "11922222222",
        numeroAcesso: "11933333333"
    };
    expect(validateTabulacao(aValidTabulacao)).toBe(true);
    const anotherValidTabulacao: Tabulacao = {
        id: validUuid,
        nomeCliente: "Maria de Paula",
        protocolo: "C202004001",
        dataAtendimento: "2020-04-12 12:35:40",
        numeroBinado: "11911111111",
        numeroAcesso: "11911111111"
    };
    expect(validateTabulacao(anotherValidTabulacao)).toBe(true);
});

describe("convertToTabulacaoAndValidate should throw if", () => {
    test("cant convert object to Tabulacao", () => {
        const invalidTabulacao = {
            id: 1,
            nomeCliente: "Jõao Santos",
            protocolo: "C202004002",
            dataAtendimento: "2020-04-12 12:43:12",
            numeroBinado: "11922222222",
            numeroAcesso: "11933333333"
        };
        expect(() => {
            convertToTabulacaoAndValidate(invalidTabulacao);
        }).toThrow(/Unable to convert/);
    });
    test("input is not a valid Tabulacao", () => {
        const invalidTabulacao = {
            id: validUuid,
            nomeCliente: "anyNomeCliente",
            protocolo: "a-non-alphanumeric-protocol",
            dataAtendimento: "2020-04-12 12:43:12",
            numeroBinado: "anyNumeroBinado",
            numeroAcesso: "anyNumeroAcesso"
        };
        expect(() => {
            convertToTabulacaoAndValidate(invalidTabulacao);
        }).toThrow(/not a valid/);
    });
});

test("should convert an object to a Tabulacao", () => {
    const aValidObject = {
        id: validUuid,
        nomeCliente: "Jõao Santos",
        protocolo: "C202004002",
        dataAtendimento: "2020-04-12 12:43:12",
        numeroBinado: "11922222222",
        numeroAcesso: "11933333333"
    };
    const aValidTabulacao: Tabulacao = {
        id: validUuid,
        nomeCliente: "Jõao Santos",
        protocolo: "C202004002",
        dataAtendimento: "2020-04-12 12:43:12",
        numeroBinado: "11922222222",
        numeroAcesso: "11933333333"
    };
    const result: unknown = convertToTabulacaoAndValidate(aValidObject);
    expect(isTabulacao(result)).toBe(true);
    expect(result).toEqual(aValidTabulacao);
});
