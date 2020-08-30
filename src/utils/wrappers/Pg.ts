import { Pool, QueryConfig, QueryResult } from "pg";

export interface Database {
    query: (query: QueryConfig) => Promise<QueryResult>;
}

class Pg implements Database {
    private pool: Pool;
    constructor() {
        this.pool = new Pool();
    }
    async query(query: QueryConfig): Promise<QueryResult> {
        return this.pool.query(query);
    }
}

export default Pg;
