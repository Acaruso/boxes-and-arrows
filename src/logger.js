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

    appendToNode(s, id) {
        if (this.enabled === false) {
            return;
        }

        const box = this.boxes.getBox(id);
        if (box !== null && box !== undefined) {
            box.appendString(s);
        }
    }

    appendArrayToNode(arr, labels, id) {
        if (this.enabled === false) {
            return;
        }

        const box = this.boxes.getBox(id);
        if (box !== null && box !== undefined) {
            box.appendArray(arr, labels);
        }
    }

    appendToNodeDetails(s, id) {
        if (this.enabled === false) {
            return;
        }

        const box = this.boxes.getBox(id);
        if (box !== null && box !== undefined) {
            box.appendStringDetails(s);
        }
    }

    appendArrayToNodeDetails(arr, labels, id) {
        if (this.enabled === false) {
            return;
        }

        const box = this.boxes.getBox(id);
        if (box !== null && box !== undefined) {
            box.appendArrayDetails(arr, labels);
        }
    }
}

export { Logger };
