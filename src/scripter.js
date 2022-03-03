import { getAllIdsInTree, moveBoxesByDelta } from "./tree_util";

class Logger {
    constructor(boxes) {
        this.boxes = boxes;
        this.rootNodeId = null;
    }

    newNode(s, parentId) {
        const id = this.boxes.addBox(s, { x: 0, y: 0 });

        if (this.rootNodeId === null) {
            this.rootNodeId = id;
        }

        if (parentId !== null) {
            this.boxes.addConnection(parentId, id);
        }

        return id;
    }

    appendToNode(s, id) {
        const box = this.boxes.getBox(id);
        if (box !== null && box !== undefined) {
            box.appendString(s);
        }
    }
}

class Scripter {
    constructor(model, treeFormatter) {
        this.model = model;
        this.boxes = model.boxes;
        this.treeFormatter = treeFormatter;
        this.logger = new Logger(this.boxes);
        this.rootNodeId = null;
    }

    runUserFn(fn) {
        this.logger.rootNodeId = null;
        fn(this.logger);
        this.treeFormatter.treeFormat(this.logger.rootNodeId);
        const treeIds = getAllIdsInTree(this.logger.rootNodeId, this.boxes);
        moveBoxesByDelta(treeIds, 5, 5, this.boxes);
    }

    run() {
        const fibResult = this.fib(5, null);
        this.treeFormatter.treeFormat(this.logger.rootNodeId);
    }

    fib(n, parentId) {
        const id = this.logger.newNode(`fib(${n})`, parentId);
        let res = 0;
        if (n === 0) {
            res = 0;
        } else if (n === 1) {
            res = 1;
        } else {
            res = this.fib(n - 1, id) + this.fib(n - 2, id);
        }
        this.logger.appendToNode(` -> ${res}`, id);
        return res;
    }
}

export { Scripter };
