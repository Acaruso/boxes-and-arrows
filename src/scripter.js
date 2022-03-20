import { getAllIdsInTree, moveBoxesByDelta } from "./tree_util";

class Logger {
    constructor(boxes) {
        this.boxes = boxes;
        this.rootNodeId = null;
        this.enabled = true;
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    newNode(str, parentId) {
        if (this.enabled === false) {
            return;
        }

        const id = this.boxes.addBox("", { x: 0, y: 0 });
        const box = this.boxes.getBox(id);
        box.appendString(str);

        if (this.rootNodeId === null) {
            this.rootNodeId = id;
        }

        if (parentId !== null) {
            this.boxes.addConnection(parentId, id);
        }

        return id;
    }

    // newNode(s, parentId) {
    //     if (this.enabled === false) {
    //         return;
    //     }

    //     const id = this.boxes.addBox(s, { x: 0, y: 0 });

    //     if (this.rootNodeId === null) {
    //         this.rootNodeId = id;
    //     }

    //     if (parentId !== null) {
    //         this.boxes.addConnection(parentId, id);
    //     }

    //     return id;
    // }

    appendToNode(s, id) {
        if (this.enabled === false) {
            return;
        }

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

    runUserFunction(fn) {
        this.logger.rootNodeId = null;
        this.logger.enable();
        fn(this.logger);
        this.treeFormatter.treeFormat(this.logger.rootNodeId);
        const treeIds = getAllIdsInTree(this.logger.rootNodeId, this.boxes);
        moveBoxesByDelta(treeIds, 5, 5, this.boxes);
    }
}

export { Scripter };
