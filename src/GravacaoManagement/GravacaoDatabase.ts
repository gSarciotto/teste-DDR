import { Database } from "../utils";
import { QueryResultRow, QueryArrayConfig, QueryResult, QueryConfig } from "pg";
import Gravacao from "./Gravacao";

export interface IGravacaoDatabase {
    query: (query: QueryConfig) => Promise<QueryResult>;
    insertOne: (gravacao: Gravacao) => Promise<QueryResultRow>;
}

export class GravacaoDatabase implements IGravacaoDatabase {
    constructor(private database: Database) {}
    query(query: QueryConfig): Promise<QueryResult> {
        return this.database.query(query);
    }
    insertOne(gravacao: Gravacao): Promise<QueryResultRow> {
        const query: QueryArrayConfig = {
            text:
                "INSERT INTO gravacoes (id, telefone, ramal, data_gravacao) VALUES ($1, $2, $3, $4)",
            values: [
                gravacao.id,
                gravacao.telefone,
                gravacao.ramal,
                gravacao.dataGravacao
            ],
            rowMode: "array"
        };
        return this.query(query);
    }
}

export default GravacaoDatabase;
