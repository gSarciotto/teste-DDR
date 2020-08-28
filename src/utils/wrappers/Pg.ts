import { Pool, QueryConfig, QueryResult } from "pg";

class Pg {
    private pool: Pool;
    constructor() {
        this.pool = new Pool();
    }
    async query(query: QueryConfig): Promise<QueryResult> {
        return this.pool.query(query);
    }
}

export default Pg;
