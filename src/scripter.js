import { getAllIdsInTree, moveBoxesByDelta } from "./tree_util";
import { Logger } from "./logger";

class Scripter {
    constructor(model, treeFormatter) {
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
