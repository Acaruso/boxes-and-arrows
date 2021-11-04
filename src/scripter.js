class Scripter {
    constructor(model) {
        this.model = model;
    }

    add(x, y) {
        const id = this.model.boxes.addBox("test", { x, y });
        return this.model.boxes.getBox(id);
    }

    add(text, x, y) {
        const id = this.model.boxes.addBox(text, { x, y });
        return this.model.boxes.getBox(id);
    }

    connect(a, b) {
        this.model.boxes.addConnection(a, b);
    }

    getStr(x) {
        // return x.toString();
        let s = x.toString(2);
        while (s.length < 5) {
            s = "0" + s;
        }
        return s;
    }

    makeTree(numLevels) {
        let x = 500;
        let y = 20;
        let xPadding = 500;
        let yPadding = 100;

        let count = 0;
        let arr = [];

        arr.push(
            this.add(this.getStr(count), x, y)
        );
        count++;

        for (let level = 0; level < numLevels - 1; level++) {
            y += yPadding;
            xPadding = xPadding / 2;
            let n = arr.length;
            for (let k = 0; k < n; k++) {
                // use array like queue
                // pop from front, push to back
                let cur = arr.shift();
                let left = this.add(this.getStr(count), cur.rect.x - xPadding, y);
                count++;
                let right = this.add(this.getStr(count), cur.rect.x + xPadding, y);
                count++;
                this.connect(cur.id, left.id);
                this.connect(cur.id, right.id);
                arr.push(left);
                arr.push(right);
            }
        }
    }

    genRandom() {
        const numElts = 15;

        for (let i = 0; i < numElts; i++) {
            this.add(rand(1000), rand(1000));
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
