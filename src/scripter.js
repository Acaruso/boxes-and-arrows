class Scripter {
    constructor(model) {
        this.model = model;
        this.boxes = model.boxes;
        this.xPadding = 80;
        this.yPadding = 80;
        this.arr = [0, 3, 2, 3];
        this.levels = [];
        this.maxLevelWidth = 0;
    }

    run() {
        let rootId = this.addBox(null, 0);
        this.inner(rootId, 1);
        this.maxLevelWidth = this.getMaxLevelWidth();
        this.layout();
        this.layout2();
    }

    inner(parentId, level) {
        if (level < this.arr.length) {
            for (let i = 0; i < this.arr[level]; i++) {
                let curId = this.addBox(parentId, level);
                this.inner(curId, level + 1);
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

    layout() {
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

    layout2() {
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
}

export { Scripter };
