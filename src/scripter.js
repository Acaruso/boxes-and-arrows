function lastElt(arr) {
    if (arr.length > 0) {
        return arr[arr.length - 1];
    } else {
        return null;
    }
}

class Scripter {
    constructor(model) {
        this.model = model;
        this.boxes = model.boxes;
        this.xPadding = 40;
        this.yPadding = 80;
        // num children at each level
        // level 0 is root node
        this.arr = [0, 2, 2, 3, 2, 2];
        this.levels = [];
        this.rootNodeId = null;
    }

    run() {
        const x = this.fib(5, null);
        const levels = this.makeLevels(this.rootNodeId);
        this.leftLayout(levels);
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
        box.appendStr(s);
    }

    fib(n, parentId) {
        let str = `fib(${n})`;
        const id = this.newNode(str, parentId);
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

    makeLevels(rootNodeId) {
        let queue = [];
        let levels = [];
        let curLevel = 0;

        queue.push(rootNodeId);

        while (queue.length > 0) {
            const n = queue.length;
            for (let i = 0; i < n; i++) {
                const curId = queue.shift();
                const childrenIds = this.boxes.getConnections(curId);
                for (const cid of childrenIds) {
                    queue.push(cid);
                }
                if (levels.length - 1 < curLevel) {
                    levels.push([]);
                }
                levels[curLevel].push(curId);
            }
            curLevel++;
        }

        return levels;
    }

    leftLayout(levels) {
        const xStart = 500;
        const yStart = 100;
        const xPadding = 40;
        const yPadding = 80;

        let x = xStart;
        let y = yStart;

        for (let i = 0; i < levels.length; i++) {
            let curLevel = levels[i];
            x = xStart;
            for (let k = 0; k < curLevel.length; k++) {
                let box = this.boxes.getBox(curLevel[k]);
                box.setCoord({ x, y });
                x += box.rect.w + xPadding;
            }
            y += yPadding;
        }
    }




    // old stuff

    // run() {
    //     let rootId = this.addBox(null, 0);
    //     this.buildTree(rootId, 1);
    //     this.leftLayout();
    //     this.centerLayout();
    // }

    buildTree(parentId, level) {
        if (level < this.arr.length) {
            for (let i = 0; i < this.arr[level]; i++) {
                let curId = this.addBox(parentId, level);
                this.buildTree(curId, level + 1);
            }
        }
    }

    addBox(parentId, levelIdx) {
        let id = this.boxes.addBox("", { x: 0, y: 0 });

        if (parentId !== null) {
            this.boxes.addConnection(parentId, id);
        }

        if (levelIdx >= this.levels.length) {
            this.levels.push([]);
        }

        this.levels[levelIdx].push(id);

        return id;
    }

    // leftLayout(levels) {
    //     let x = 500;
    //     let y = 100;

    //     for (let i = 0; i < levels.length; i++) {
    //         let curLevel = levels[i];
    //         x = 0;
    //         for (let k = 0; k < curLevel.length; k++) {
    //             let box = this.boxes.getBox(curLevel[k]);
    //             box.setCoord({ x, y });
    //             x += this.xPadding;
    //         }
    //         y += this.yPadding;
    //     }
    // }

    centerLayout() {
        for (let i = this.levels.length - 2; i >= 0; i--) {
            for (let id of this.levels[i]) {
                let box = this.boxes.getBox(id);
                let childrenIds = this.boxes.getConnections(id);
                let mid = this.getChildrensMidpoint(childrenIds);
                box.setCoord({
                    x: mid - (box.rect.w / 2),
                    y: box.coord.y
                });
            }
        }
    }

    getChildrensMidpoint(childrenIds) {
        let min = 9999999;
        let max = -1;

        for (const childId of childrenIds) {
            let childBox = this.boxes.getBox(childId);
            const lhs = childBox.rect.x;
            const rhs = childBox.rect.x + childBox.rect.w;
            min = Math.min(min, lhs);
            max = Math.max(max, rhs);
        }
        return min + ((max - min) / 2);
    }

    // do we even need this?
    getMaxLevelWidth() {
        let maxLevelWidth = 0;
        for (const level of this.levels) {
            let levelWidth = 0;
            for (const id of level) {
                const box = this.boxes.getBox(id);
                levelWidth += box.rect.w + this.xPadding;
            }
            maxLevelWidth = Math.max(maxLevelWidth, levelWidth);
        }
        return maxLevelWidth;
    }
}

export { Scripter };
