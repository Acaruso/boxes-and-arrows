class Scripter {
    constructor(model) {
        this.model = model;
    }

    test() {
        this.model.boxes.addBox("test", { x: 4, y: 4 });
        this.model.boxes.addBox("test", { x: 90, y: 4 });
        this.model.boxes.addBox("test", { x: 90, y: 100 });
    }
}

export { Scripter };
