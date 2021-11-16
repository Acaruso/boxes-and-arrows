class Scripter {
    constructor(model) {
        this.model = model;
    }

    addBox(text, x, y) {
        const id = this.model.boxes.addBox(text, { x, y });
        return this.model.boxes.getBox(id);
    }

    connect(a, b) {
        this.model.boxes.addConnection(a, b);
    }

    getStr(x, size) {
        let s = x.toString(2);
        while (s.length < size) {
            s = "0" + s;
        }
        return s;
    }

    makeBinaryTree(numLevels) {
        let x = 500;
        let y = 20;
        let xPadding = 500;
        let yPadding = 100;

        let count = 0;
        let arr = [];

        arr.push(
            this.addBox(this.getStr(count, 1), x, y)
        );
        count++;

        for (let level = 0; level < numLevels - 1; level++) {
            count = 0;
            y += yPadding;
            xPadding = Math.floor(xPadding / 2);
            let n = arr.length;
            for (let k = 0; k < n; k++) {
                let cur = arr.shift();
                let left = this.addBox(
                    this.getStr(count, level + 1),
                    cur.rect.x - xPadding,
                    y
                );
                count++;
                let right = this.addBox(
                    this.getStr(count, level + 1),
                    cur.rect.x + xPadding,
                    y
                );
                count++;
                this.connect(cur.id, left.id);
                this.connect(cur.id, right.id);
                arr.push(left);
                arr.push(right);
            }
        }
    }

    makeBinaryTree2(numLevels) {
        let x = 500;
        let y = 20;
        let xPadding = 500;
        let yPadding = 100;

        let arr = [];

        arr.push(
            this.addBox("", x, y)
        );

        for (let level = 1; level < numLevels; level++) {
            y += yPadding;
            xPadding = Math.floor(xPadding / 2);
            let n = arr.length;
            for (let k = 0; k < n; k++) {
                let cur = arr.shift();
                let left = this.addBox(
                    this.getStr(cur.text + "0", level),
                    cur.rect.x - xPadding,
                    y
                );
                let right = this.addBox(
                    this.getStr(cur.text + "1", level),
                    cur.rect.x + xPadding,
                    y
                );
                this.connect(cur.id, left.id);
                this.connect(cur.id, right.id);
                arr.push(left);
                arr.push(right);
            }
        }
    }

    // makePerm(input) {
    //     const levels = this.getPermLevels(input);
    //     console.log(levels);

    //     const xPadding = 40;
    //     const numEltsInBase = levels[levels.length - 1].length;
    //     const baseWidth = xPadding * numEltsInBase;

    //     // let x = 500;
    //     // let y = 20;
    //     // let xPadding = 500;
    //     // let yPadding = 100;

    //     // for (let i = 1; i < levels.length; i++) {

    //     // }

    //     for (const level of levels) {
    //         for (const elt of level) {
    //             let id = this.addBox("", 0, 0);
    //         }
    //         // let id = this.addBox("", 0, 0);
    //     }
    // }

    makePerm(input) {
        const numLevels = input.length + 1;
        let queue = [];

        let rootId = this.addBox("", 0, 0);
        let rootBox = this.model.boxes.getBox(rootId);
        queue.push(rootBox);

        for (let level = 1; level < numLevels; level++) {
            let n = queue.length;

            for (let k = 0; k < n; k++) {
                let cur = queue.shift();
                let curArr = cur.text.split(",");
                for (const elt of input) {
                    if (!curArr.includes(elt)) {
                        let newText = cur === "" ? elt : cur + "," + elt;
                        let newId = this.addBox(newText, 0, 0);
                        let newBox = this.model.boxes.getBox(newId);
                        queue.push(newBox);
                    }
                }
            }
        }
    }

    getPermLevels(input) {
        const numLevels = input.length + 1;
        let queue = [];
        let levelsArr = [];

        levelsArr.push([""]);
        queue.push("");

        for (let level = 1; level < numLevels; level++) {
            let levelArr = [];
            let n = queue.length;

            for (let k = 0; k < n; k++) {
                let cur = queue.shift();
                let curArr = cur.split(",");
                for (const elt of input) {
                    if (!curArr.includes(elt)) {
                        let newText = cur === "" ? elt : cur + "," + elt;
                        levelArr.push(newText);
                        queue.push(newText);
                    }
                }
            }
            levelsArr.push(levelArr);
        }

        return levelsArr;
    }

    // makePerm(input) {
    //     let x = 500;
    //     let y = 20;
    //     let xPadding = 500;
    //     let yPadding = 100;
    //     const numLevels = input.length;

    //     let queue = [];

    //     queue.push(
    //         this.addBox("", x, y)
    //     );

    //     for (let level = 0; level < numLevels - 1; level++) {
    //         y += yPadding;
    //         xPadding = xPadding / 2;
    //         let n = queue.length;

    //         for (let k = 0; k < n; k++) {
    //             let levelArr = [];
    //             let cur = queue.shift();
    //             let curArr = cur.text.split(",");
    //             for (const elt of input) {
    //                 if (!curArr.includes(elt)) {
    //                     let newText = cur.text + "," + elt;
    //                     levelArr.push(newText);
    //                 }
    //             }
    //         }

    //         let xStart = x - ((xPadding * levelArr.length) / 2);
    //         for (let k = 0; k < levelArr.length; k++) {
    //             let elt = levelArr[k];
    //             this.addBox(elt, xStart, y);
    //             xStart += xPadding;
    //         }
    //     }
    // }

    genRandom() {
        const numElts = 15;

        for (let i = 0; i < numElts; i++) {
            this.addBox(" ", rand(1000), rand(1000));
        }

        for (let i = 0; i < numElts * 3; i++) {
            this.connect(rand(numElts), rand(numElts));
        }
    }

    wobble() {
        this.model.boxes.forEach((box) => {
            let coord = { ...box.coord };
            coord.x += (Math.random() * 2) - 1;
            coord.y += (Math.random() * 2) - 1;
            box.setCoord(coord);
        })
    }
}

function rand(max) {
    return Math.floor(Math.random() * max);
}

export { Scripter };
