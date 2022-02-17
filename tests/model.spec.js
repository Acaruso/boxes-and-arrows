import { Model } from "../src/model";

describe("Model", () => {
    test("do stuff", () => {
        const model = new Model();
        model.boxes.addBox("test box", { x: 0, y: 0 });
        expect(model.boxes.boxes.length).toEqual(1);
    });
});
