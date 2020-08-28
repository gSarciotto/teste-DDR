import * as express from "express";
import { generateTabulacoesRouter } from "./TabulacaoGerenciamento";
import { config } from "dotenv";
import { Pg } from "./utils";

config();

const pg = new Pg();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use(generateTabulacoesRouter(pg));

app.listen(3000, () => {
    console.log("server started");
});
