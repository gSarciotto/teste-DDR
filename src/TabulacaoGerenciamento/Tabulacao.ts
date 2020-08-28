// wont use dataAtendimento as date for now because of timezones
interface Tabulacao {
    readonly id: string;
    readonly nomeCliente: string;
    readonly protocolo: string;
    readonly dataAtendimento: string;
    readonly numeroBinado: string;
    readonly numeroAcesso: string;
}

export default Tabulacao;
