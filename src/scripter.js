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

    // makePerm(input) {
    //     let x = 500;
    //     let y = 20;
    //     let xPadding = 500;
    //     let yPadding = 100;
    //     const numLevels = input.length;
    //     let n = input.length;

    //     let queue = [];

    //     queue.push(
    //         this.addBox("", x, y)
    //     );

    //     for (let level = 0; level < numLevels - 1; level++) {
    //         y += yPadding;
    //         xPadding = xPadding / 2;

    //         for (let k = 0; k < n; k++) {
    //             let cur = queue.shift();
    //             let left = this.addBox(
    //                 this.getStr(count, level + 1),
    //                 cur.rect.x - xPadding,
    //                 y
    //             );
    //             count++;
    //             let right = this.addBox(
    //                 this.getStr(count, level + 1),
    //                 cur.rect.x + xPadding,
    //                 y
    //             );
    //             count++;
    //             this.connect(cur.id, left.id);
    //             this.connect(cur.id, right.id);
    //             queue.push(left);
    //             queue.push(right);
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
