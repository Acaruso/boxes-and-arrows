class Scripter {
    constructor(model, treeFormatter) {
        this.model = model;
        this.boxes = model.boxes;
        this.treeFormatter = treeFormatter;

        this.rootNodeId = null;
    }

    run() {
        const fibResult = this.fib(7, null);

        this.treeFormatter.treeFormat(this.rootNodeId);
        // this.treeFormatter.leftLayout(this.rootNodeId);
    }

    newNode(s, parentId) {
        let id = this.boxes.addBox(s, { x: 0, y: 0 });

        if (this.rootNodeId === null) {
            this.rootNodeId = id;
        }

        if (parentId !== null) {
            this.boxes.addConnection(parentId, id);
        }

        return id;
    }

    appendToNode(s, id) {
        let box = this.boxes.getBox(id);
        box.appendString(s);
    }

    fib(n, parentId) {
        const id = this.newNode(`fib(${n})`, parentId);
        let res = 0;
        if (n === 0) {
            res = 0;
        } else if (n === 1) {
            res = 1;
        } else {
            res = this.fib(n - 1, id) + this.fib(n - 2, id);
        }
        this.appendToNode(` -> ${res}`, id);
        return res;
    }
}

export { Scripter };
