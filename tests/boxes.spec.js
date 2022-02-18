import { Boxes } from "../src/boxes";

describe("Boxes", () => {
    test("add box, boxes length should be 1", () => {
        const boxes = new Boxes();
        boxes.addBox("test box", { x: 0, y: 0 });
        expect(boxes.getLength()).toEqual(1);
    });

    test("add and delete box, boxes length should be 0", () => {
        const boxes = new Boxes();
        const id = boxes.addBox("test box", { x: 0, y: 0 });
        boxes.deleteBox(id);
        expect(boxes.getLength()).toEqual(0);
    });

    test("add boxes, delete all boxes, boxes length should be 0", () => {
        const boxes = new Boxes();
        boxes.addBox("1", { x: 43, y: 2 });
        boxes.addBox("2", { x: 34, y: 7 });
        boxes.addBox("3", { x: 87, y: 34 });
        boxes.deleteAll();
        expect(boxes.getLength()).toEqual(0);
    });

    test("create connection, connection should exist", () => {
        const boxes = new Boxes();
        const id1 = boxes.addBox("1", { x: 0, y: 0 });
        const id2 = boxes.addBox("1", { x: 13, y: 1414 });
        boxes.addConnection(id1, id2);
        const connections = boxes.getConnections(id1, id2);
        expect(connections[0][0].id).toEqual(id1);
        expect(connections[0][1].id).toEqual(id2);
    });

    test("create connection, delete source, connection should be deleted", () => {
        const boxes = new Boxes();
        const id1 = boxes.addBox("1", { x: 0, y: 0 });
        const id2 = boxes.addBox("1", { x: 13, y: 1414 });
        boxes.addConnection(id1, id2);
        boxes.deleteBox(id1);
        const connections = boxes.getConnections(id1, id2);
        expect(connections.length).toEqual(0);
    });

    test("create connection, delete destination, connection should be deleted", () => {
        const boxes = new Boxes();
        const id1 = boxes.addBox("1", { x: 0, y: 0 });
        const id2 = boxes.addBox("1", { x: 13, y: 1414 });
        boxes.addConnection(id1, id2);
        boxes.deleteBox(id2);
        const connections = boxes.getConnections(id1, id2);
        expect(connections.length).toEqual(0);
    });

});
