import { arrayType } from "./constants/constants";
import { arrayDataConstants } from "./constants/array_data_constants";

class ArrayData {
    constructor(arr, labels, colors=[]) {
        this.type = arrayType;
        this.data = [...arr];
        this.labels = [];
        this.colors = colors;

        for (const [str, index] of labels) {
            this.addLabel(str, index);
        }

        this.totalHeight = 0;
        if (this.labels.length > 0) {
            this.totalHeight = arrayDataConstants.totalHeightWithIndexLabels;
        } else {
            this.totalHeight = arrayDataConstants.totalHeightWithoutIndexLabels;
        }
    }

    clone() {
        const newData = [...this.data];
        const newColors = [...this.colors];
        const newArrayData = new ArrayData(newData, [], newColors);

        for (const [str, index] of this.labels) {
            newArrayData.addLabel(str, index);
        }

        if (newArrayData.labels.length > 0) {
            newArrayData.totalHeight = arrayDataConstants.totalHeightWithIndexLabels;
        } else {
            newArrayData.totalHeight = arrayDataConstants.totalHeightWithoutIndexLabels;
        }

        return newArrayData;
    }

    addLabel(str, index) {
        const i = this.labels.findIndex(([_, eltIndex]) => eltIndex === index);
        if (i !== -1) {
            this.labels[i][0] += `,${str}`;
        } else {
            this.labels.push([str, index]);
        }
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
