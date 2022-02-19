class Scripter {
    constructor(model) {
        this.model = model;
        this.x = 500;
        this.y = 100;
        this.yIncrement = 30;
    }

    run() {
        let prevId = null;
        let curId = null;

        for (let i = 0; i < 10; i++) {
            curId = this.model.boxes.addBox(i, { x: this.x, y: this.y });

            this.y += this.yIncrement;
            
            if (prevId !== null) {
                this.model.boxes.addConnection(prevId, curId);
            }

            prevId = curId;
        }
    }
}

export { Scripter };
