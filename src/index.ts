import * as express from "express";
import * as cron from "node-cron";
import { config } from "dotenv";
import { Pg } from "./utils";
import { generateGravacoesRouter } from "./GravacaoManagement";
import { generateTabulacoesRouter } from "./TabulacaoManagement";
import MatchingMakerDatabase from "./MatchingMaker/MatchingMakerDatabase";
import { generateListMatchingsRouter } from "./ListMatchings";

config();

const pg = new Pg();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(generateTabulacoesRouter(pg));
app.use(generateGravacoesRouter(pg));
app.use(generateListMatchingsRouter(pg));

app.listen(3000, () => {
    console.log("server started");
    cron.schedule("* * */6 * * *", () => {
        console.log("scheduled function running");
        const matchingMakerDatabase = new MatchingMakerDatabase(pg);
        matchingMakerDatabase.run().catch((err) => {
            console.log(err);
        });
    });
});
