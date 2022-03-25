import { arrayType } from "./constants/constants";
import { arrayDataConstants } from "./constants/array_data_constants";

class ArrayData {
    constructor(arr, labels) {
        this.type = arrayType;
        this.data = arr;
        this.labels = labels;

        this.totalHeight = 0;
        if (this.labels.length > 0) {
            this.totalHeight = arrayDataConstants.totalHeightWithIndexLabels;
        } else {
            this.totalHeight = arrayDataConstants.totalHeightWithoutIndexLabels;
        }
    }

    clone() {
        const newData = [...this.data];
        const newArrayData = new ArrayData(newData, []);

        for (const label of this.labels) {
            newArrayData.addLabel(label.str, label.index);
        }

        return newArrayData;
    }

    addLabel(str, index) {
        this.labels.push({str, index});
    }

    getRect() {
        const arrConsts = arrayDataConstants;
        return {
            x: 0,
            y: 0,
            w: (this.data.length * arrConsts.refRect.w) + (arrConsts.sidePadding * 2),
            h: this.totalHeight
        };
    }
}

export { ArrayData };
