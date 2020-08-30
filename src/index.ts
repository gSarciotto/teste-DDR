import * as express from "express";
import * as cron from "node-cron";
import { config } from "dotenv";
import { Pg } from "./utils";
import { generateGravacoesRouter } from "./GravacaoGerenciamento";
import { generateTabulacoesRouter } from "./TabulacaoGerenciamento";
import MatchingMakerDatabase from "./MatchingMaker/MatchingMakerDatabase";

config();

const pg = new Pg();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use(generateTabulacoesRouter(pg));
app.use(generateGravacoesRouter(pg));

app.listen(3000, () => {
    console.log("server started");
    cron.schedule("*/10 * * * * *", () => {
        console.log("scheduled function running");
        const matchingMakerDatabase = new MatchingMakerDatabase(pg);
        matchingMakerDatabase.run().catch((err) => {
            console.log(err);
        });
    });
});
