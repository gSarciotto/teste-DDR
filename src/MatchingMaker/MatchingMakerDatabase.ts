import { Pg } from "../utils";
import { QueryConfig, QueryResult } from "pg";

export interface IMatchingMakerDatabase {
    query: (query: QueryConfig) => Promise<QueryResult>;
    run: () => Promise<QueryResult>;
}

export class MatchingMakerDatabase implements IMatchingMakerDatabase {
    constructor(private database: Pg) {}
    query(query: QueryConfig): Promise<QueryResult> {
        return this.database.query(query);
    }
    run(): Promise<QueryResult> {
        const unmatchedGravacoesQuery =
            "unmatched_gravacoes AS (SELECT gravacoes.* FROM gravacoes LEFT JOIN matchings ON (gravacoes.id=matchings.gravacao_id) WHERE (matchings.gravacao_id IS NULL))";
        const unmatchedTabulacoesQuery =
            "unmatched_tabulacoes AS (SELECT tabulacoes.* FROM tabulacoes LEFT JOIN matchings ON (tabulacoes.id=matchings.tabulacao_id) WHERE (matchings.tabulacao_id IS NULL))";
        const query: QueryConfig = {
            text: `WITH ${unmatchedGravacoesQuery}, ${unmatchedTabulacoesQuery} INSERT INTO matchings (tabulacao_id, gravacao_id) SELECT unmatched_tabulacoes.id, unmatched_gravacoes.id FROM unmatched_gravacoes INNER JOIN unmatched_tabulacoes ON (unmatched_tabulacoes.numero_binado=unmatched_gravacoes.telefone OR unmatched_tabulacoes.numero_acesso=unmatched_gravacoes.telefone)`
        };
        return this.query(query);
    }
}

export default MatchingMakerDatabase;
