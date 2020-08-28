import { Pg } from "../utils";
import { QueryConfig, QueryResult } from "pg";

export interface ITabulacaoDatabase {
    query: (query: QueryConfig) => Promise<QueryResult>;
}

export class TabulacaoDatabase implements ITabulacaoDatabase {
    constructor(private pg: Pg) {}
    query(query: QueryConfig): Promise<QueryResult> {
        return this.pg.query(query);
    }
}

export default TabulacaoDatabase;
