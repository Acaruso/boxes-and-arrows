class Scripter {
    constructor(model) {
        this.model = model;
        this.boxes = model.boxes;
        this.xPadding = 80;
        this.yPadding = 80;
        // num children at each level
        // level 0 is root node
        this.arr = [0, 2, 2, 3, 2, 2];
        this.levels = [];
    }

    run() {
        let rootId = this.addBox(null, 0);
        this.buildTree(rootId, 1);
        this.leftLayout();
        this.centerLayout();
    }

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

    leftLayout() {
        let x = 500;
        let y = 100;

        for (let i = 0; i < this.levels.length; i++) {
            let curLevel = this.levels[i];
            x = 0;
            for (let k = 0; k < curLevel.length; k++) {
                let box = this.boxes.getBox(curLevel[k]);
                box.setCoord({ x, y });
                x += this.xPadding;
            }
            y += this.yPadding;
        }
    }

    centerLayout() {
        for (let i = this.levels.length - 2; i >= 0; i--) {
            for (let id of this.levels[i]) {
                let box = this.boxes.getBox(id);
                let childrenIds = this.boxes.getDests(id);
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
