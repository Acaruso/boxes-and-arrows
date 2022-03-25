import { arrayType } from "./constants";

class ArrayData {
    constructor(arr, labels) {
        this.type = arrayType;
        this.data = arr;
        this.labels = labels;
    }

    clone() {
        let clone = {
            type: arrayType,
            data: [...this.data],
            labels: []
        };

        for (const label of this.labels) {
            clone.labels.push({ ...label });
        }

        return clone;
    }
}

export { ArrayData };
