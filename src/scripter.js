class Scripter {
    constructor() {}

    init(input) {
        this.arr = this.makePerm(input);
        this.idx = this.arr.length - 1;
    }

    getNext() {
        // if (this.idx >= 0) {
        //     return this.arr[this.idx--];
        // } else {
        //     return "";
        // }

        return "";
    }

    makePerm(input) {
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
        console.log(levelsArr)

        const flatArr = levelsArr.flat(2);
        console.log(flatArr)
        return flatArr;
    }
}

export { Scripter };
