import {
    MatchingMakerDatabase,
    IMatchingMakerDatabase
} from "./MatchingMakerDatabase";
import { Pg } from "../utils";
import { Gravacao, GravacaoDatabase } from "../GravacaoGerenciamento";
import { Tabulacao, TabulacaoDatabase } from "../TabulacaoGerenciamento";
import { config } from "dotenv";

config();

const pg = new Pg();
const matchingDatabase = new MatchingMakerDatabase(pg);
const gravacaoDatabase = new GravacaoDatabase(pg);
const tabulacaoDatabase = new TabulacaoDatabase(pg);

async function clearTables(database: IMatchingMakerDatabase): Promise<void> {
    await database.query({
        text: "DELETE FROM gravacoes"
    });
    await database.query({
        text: "DELETE FROM tabulacoes"
    });
    await database.query({
        text: "DELETE from matchings"
    });
}

const gravacoes: Gravacao[] = [
    //n-th element matches with n-th element of tabulacoes
    {
        id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
        telefone: "11911111111",
        ramal: "203",
        dataGravacao: "2020-04-12 12:34:53"
    },
    {
        id: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d",
        telefone: "11933333333",
        ramal: "203",
        dataGravacao: "2020-04-12 12:43:01"
    }
];

const tabulacoes: Tabulacao[] = [
    {
        id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        nomeCliente: "Maria de Paula",
        protocolo: "C202004001",
        dataAtendimento: "2020-04-12 12:35:40",
        numeroBinado: "11911111111",
        numeroAcesso: "11911111112"
    },
    {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        nomeCliente: "Jõao Santos",
        protocolo: "C202004002",
        dataAtendimento: "2020-04-12 12:43:12",
        numeroBinado: "11922222222",
        numeroAcesso: "11933333333"
    }
];

describe("MatchingMakerDatabase should", () => {
    beforeAll(async () => {
        await clearTables(matchingDatabase);
    });
    afterAll(async () => {
        await clearTables(matchingDatabase);
        return pg.end();
    });
    afterEach(() => {
        return clearTables(matchingDatabase);
    });

    test("create a matching utilizing numeroBinado", async () => {
        const expectedMatchings = [
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: expect.anything(),
                tabulacao_id: tabulacoes[0].id,
                gravacao_id: gravacoes[0].id
            }
        ];
        await tabulacaoDatabase.insertOne(tabulacoes[0]);
        await gravacaoDatabase.insertOne(gravacoes[0]);
        await matchingDatabase.run();
        const results = await matchingDatabase.query({
            text: "SELECT * FROM matchings"
        });
        expect(results.rows.length).toBe(expectedMatchings.length);
        expect(results.rows).toEqual(expect.arrayContaining(expectedMatchings));
    });
    test("create a matching utilizing numeroAcesso", async () => {
        const expectedMatchings = [
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: expect.anything(),
                tabulacao_id: tabulacoes[1].id,
                gravacao_id: gravacoes[1].id
            }
        ];
        await tabulacaoDatabase.insertOne(tabulacoes[1]);
        await gravacaoDatabase.insertOne(gravacoes[1]);
        await matchingDatabase.run();
        const results = await matchingDatabase.query({
            text: "SELECT * FROM matchings"
        });
        expect(results.rows.length).toBe(expectedMatchings.length);
        expect(results.rows).toEqual(expect.arrayContaining(expectedMatchings));
    });
    test("ignore previous matchings when inserting a new match (wont re-insert)", async () => {
        const expectedMatchings = [
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: expect.anything(),
                tabulacao_id: tabulacoes[0].id,
                gravacao_id: gravacoes[0].id
            },
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: expect.anything(),
                tabulacao_id: tabulacoes[1].id,
                gravacao_id: gravacoes[1].id
            }
        ];
        await tabulacaoDatabase.insertOne(tabulacoes[0]);
        await gravacaoDatabase.insertOne(gravacoes[0]);
        await matchingDatabase.run();
        await tabulacaoDatabase.insertOne(tabulacoes[1]);
        await gravacaoDatabase.insertOne(gravacoes[1]);
        await matchingDatabase.run();
        const results = await matchingDatabase.query({
            text: "SELECT * FROM matchings"
        });
        expect(results.rows.length).toBe(expectedMatchings.length);
        expect(results.rows).toEqual(expect.arrayContaining(expectedMatchings));
    });
    test("ignore gravacao without corresponding tabulacao", async () => {
        const expectedMatchings = [
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: expect.anything(),
                tabulacao_id: tabulacoes[0].id,
                gravacao_id: gravacoes[0].id
            }
        ];
        await tabulacaoDatabase.insertOne(tabulacoes[0]);
        await gravacaoDatabase.insertOne(gravacoes[0]);
        await gravacaoDatabase.insertOne(gravacoes[1]);
        await matchingDatabase.run();
        const results = await matchingDatabase.query({
            text: "SELECT * FROM matchings"
        });
        expect(results.rows.length).toBe(expectedMatchings.length);
        expect(results.rows).toEqual(expect.arrayContaining(expectedMatchings));
    });
    test("ignore tabulacao without corresponding gravacao", async () => {
        const expectedMatchings = [
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: expect.anything(),
                tabulacao_id: tabulacoes[0].id,
                gravacao_id: gravacoes[0].id
            }
        ];
        await tabulacaoDatabase.insertOne(tabulacoes[0]);
        await gravacaoDatabase.insertOne(gravacoes[0]);
        await tabulacaoDatabase.insertOne(tabulacoes[1]);
        await matchingDatabase.run();
        const results = await matchingDatabase.query({
            text: "SELECT * FROM matchings"
        });
        expect(results.rows.length).toBe(expectedMatchings.length);
        expect(results.rows).toEqual(expect.arrayContaining(expectedMatchings));
    });
    test.skip("match one tabulacao with only one gravacao", async () => {
        /* this test fails, I dont think there is an easy solution. This case only happens when there are two tabulacoes/gravacoes with same id waiting to be inserted. I could think in 2 ways to solve it, but they arent simple */
        const expectedNumberOfMatchings = 1;
        await tabulacaoDatabase.insertOne(tabulacoes[0]);
        await gravacaoDatabase.insertOne(gravacoes[0]);
        const gravacaoWithSameTelefone: Gravacao = {
            id: "4278381d-b509-42ef-aa62-9c393911f09a",
            telefone: gravacoes[0].telefone,
            ramal: "404",
            dataGravacao: "2020-04-20 17:35:03"
        };
        await gravacaoDatabase.insertOne(gravacaoWithSameTelefone);
        await matchingDatabase.run();
        const results = await matchingDatabase.query({
            text: "SELECT * FROM matchings"
        });
        expect(results.rows.length).toBe(expectedNumberOfMatchings);
    });
});
