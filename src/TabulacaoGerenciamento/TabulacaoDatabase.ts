import { Database } from "../utils";
import {
    QueryConfig,
    QueryResult,
    QueryArrayConfig,
    QueryArrayResult
} from "pg";
import Tabulacao from "./Tabulacao";

export interface ITabulacaoDatabase {
    query: (query: QueryConfig) => Promise<QueryResult>;
    insertOne: (tabulacao: Tabulacao) => Promise<QueryArrayResult>;
}

export class TabulacaoDatabase implements ITabulacaoDatabase {
    constructor(private database: Database) {}
    query(query: QueryConfig): Promise<QueryResult> {
        return this.database.query(query);
    }
    insertOne(tabulacao: Tabulacao): Promise<QueryArrayResult> {
        const query: QueryArrayConfig = {
            text:
                "INSERT INTO tabulacoes (id, nome_cliente, protocolo, data_atendimento, numero_binado, numero_acesso) VALUES ($1, $2, $3, $4, $5, $6)",
            values: [
                tabulacao.id,
                tabulacao.nomeCliente,
                tabulacao.protocolo,
                tabulacao.dataAtendimento,
                tabulacao.numeroBinado,
                tabulacao.numeroAcesso
            ],
            rowMode: "array"
        };
        return this.query(query);
    }
}

export default TabulacaoDatabase;
