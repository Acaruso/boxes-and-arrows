import { stringType } from "./constants/constants";

class StringData {
    constructor(str) {
        this.type = stringType;
        this.data = str;
    }

    clone() {
        return {
            type: stringType,
            data: this.data
        };
    }
}

export { StringData };
