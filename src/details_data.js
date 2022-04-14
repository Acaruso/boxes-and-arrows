import { detailsType } from "./constants/constants";

class DetailsData {
    constructor() {
        this.type = detailsType;
        this.data = [];
    }

    clone() {
        let newData = [];
        for (const elt of this.data) {
            newData.push(elt.clone());
        }
        return {
            type: detailsType,
            data: newData
        };
    }
}

export { DetailsData };
