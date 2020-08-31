import MatchingModel from "../MatchingModel";
import convertModelToMatching from "./ModelToMatching";
import Matching from "../Matching";

test("should convert a MatchingModel to a Matching", () => {
    const model: MatchingModel = {
        id: "any id",
        gravacao_id: "any gravacao_id",
        tabulacao_id: "any tabulacao_id"
    };
    const expected: Matching = {
        id: "any id",
        gravacaoId: "any gravacao_id",
        tabulacaoId: "any tabulacao_id"
    };
    const matching = convertModelToMatching(model);
    expect(matching).toEqual(expected);
});
