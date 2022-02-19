class Scripter {
    constructor(model) {
        this.model = model;
        this.boxes = model.boxes;
        this.xPadding = 80;
        this.yPadding = 80;
        this.arr = [0, 3, 2, 3];
        this.levels = [];
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

    run() {
        let rootId = this.addBox(null, 0);
        this.inner(rootId, 1);
        console.log(this.levels);
        this.layout();
    }

    inner(parentId, level) {
        if (level < this.arr.length) {
            for (let i = 0; i < this.arr[level]; i++) {
                let curId = this.addBox(parentId, level);
                this.inner(curId, level + 1);
            }
        }
    }

    layout() {
        let x = 500;
        let y = 100;

        for (let i = 0; i < this.levels.length; i++) {
            let curLevel = this.levels[i];
            x = 0;
            for (let k = 0; k < curLevel.length; k++) {
                let box = this.boxes.getBox(curLevel[k]);
                box.rect.x = x;
                box.rect.y = y;
                x += this.xPadding;
            }
            y += this.yPadding;
        }
    }

    getMaxLevelWidth() {
        let maxLevelWidth = 0;
        for (const level of levels) {
            let levelWidth = 0;
            for (const id of level) {
                const box = this.boxes.getBox(id);
                levelWidth += box.rect.w + this.xPadding;
            }
            maxLevelWidth = Math.max(maxLevelWidth, levelWidth);
        }
        return maxLevelWidth;
    }

    // run() {
    //     let rootId = this.boxes.addBox("", { x: 0, y: 0 });
    //     this.inner(rootId, 0);
    // }

    // inner(parentId, level) {
    //     if (level < this.arr.length) {
    //         for (let i = 0; i < this.arr[level]; i++) {
    //             let curId = this.boxes.addBox("", { x: 0, y: 0 });
    //             this.boxes.addConnection(parentId, curId);
    //             this.inner(curId, level + 1);
    //         }
    //     }
    // }

    // run() {
    //     let prevId = null;
    //     let curId = null;

    //     for (let i = 0; i < 10; i++) {
    //         curId = this.model.boxes.addBox(i, { x: this.x, y: this.y });

    //         this.y += this.yIncrement;
            
    //         if (prevId !== null) {
    //             this.model.boxes.addConnection(prevId, curId);
    //         }

    //         prevId = curId;
    //     }
    // }
}

export { Scripter };
