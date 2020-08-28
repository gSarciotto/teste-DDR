import Tabulacao from "../Tabulacao";
import {
    isStringAlphanumeric,
    validateTimestamp
} from "../../utils/validators";
import { UuidV4 } from "../../utils/wrappers/Uuid";

export function isTabulacao(input: unknown): input is Tabulacao {
    const inputAsTabulacao = input as Tabulacao;
    if (typeof inputAsTabulacao.id !== "string") return false;
    if (typeof inputAsTabulacao.nomeCliente !== "string") return false;
    if (typeof inputAsTabulacao.protocolo !== "string") return false;
    if (typeof inputAsTabulacao.dataAtendimento !== "string") return false;
    if (typeof inputAsTabulacao.numeroBinado !== "string") return false;
    if (typeof inputAsTabulacao.numeroAcesso !== "string") return false;
    return true;
}

export function validateTabulacao(tabulacao: Tabulacao): boolean {
    const uuidv4 = new UuidV4();
    if (!uuidv4.validate(tabulacao.id)) return false;
    if (tabulacao.nomeCliente === "") return false;
    if (
        tabulacao.protocolo === "" ||
        !isStringAlphanumeric(tabulacao.protocolo)
    )
        return false;
    if (!validateTimestamp(tabulacao.dataAtendimento)) return false;
    if (tabulacao.numeroBinado === "") return false;
    if (tabulacao.numeroAcesso === "") return false;
    return true;
}

//function that takes and object and tries to return the object converted to Tabulacao
export function convertToTabulacaoAndValidate(input: unknown): Tabulacao {
    if (isTabulacao(input)) {
        const isTabulacaoValid = validateTabulacao(input);
        if (isTabulacaoValid) {
            return input;
        } else {
            throw new Error("Input is not a valid Tabulacao");
        }
    } else {
        throw new Error("Unable to convert object to Tabulacao");
    }
}
