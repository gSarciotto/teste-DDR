import Gravacao from "../Gravacao";
import UuidV4 from "../../utils/wrappers/Uuid";
import {
    validateTimestamp,
    isStringAlphanumeric
} from "../../utils/validators";

export function isGravacao(input: unknown): input is Gravacao {
    const inputAsGravacao = input as Gravacao;
    if (typeof inputAsGravacao.id !== "string") return false;
    if (typeof inputAsGravacao.telefone !== "string") return false;
    if (typeof inputAsGravacao.ramal !== "string") return false;
    if (typeof inputAsGravacao.dataGravacao !== "string") return false;
    return true;
}

export function validateGravacao(input: Gravacao): boolean {
    const uuidv4 = new UuidV4();
    if (!uuidv4.validate(input.id)) return false;
    if (input.telefone === "" || !isStringAlphanumeric(input.telefone))
        return false;
    if (input.ramal === "" || !isStringAlphanumeric(input.ramal)) return false;
    if (!validateTimestamp(input.dataGravacao)) return false;
    return true;
}
