import { Box } from "../src/box";

describe("Box", () => {
    test("append chars", () => {
        const box = new Box("", { x: 0, y: 0 }, 1);
        box.appendString("a");
        box.appendString("b");
        box.appendString("c");
        expect(box.text).toEqual("abc");
    });

    test("delete chars", () => {
        const box = new Box("", { x: 0, y: 0 }, 1);
        box.appendString("a");
        box.appendString("b");
        box.appendString("c");
        box.deleteChar();
        box.deleteChar();
        expect(box.text).toEqual("a");
    });

    test("delete more chars than exist", () => {
        const box = new Box("", { x: 0, y: 0 }, 1);
        box.appendString("a");
        box.deleteChar();
        box.deleteChar();
        expect(box.text).toEqual("");
    });

    test("update coord", () => {
        const box = new Box("", { x: 0, y: 0 }, 1);
        box.setCoord({ x: 10, y: 20 });
        expect(box.coord).toEqual({ x: 10, y: 20 });
    });

    test("update coord, should update rect", () => {
        const box = new Box("", { x: 0, y: 0 }, 1);
        box.setCoord({ x: 10, y: 20 });
        expect(box.rect.x).toEqual(10);
        expect(box.rect.y).toEqual(20);
    });
});
