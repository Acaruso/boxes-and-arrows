import { stringType } from "./constants/constants";

class StringData {
    constructor(str) {
        this.type = stringType;
        this.data = str;
    }

    clone() {
        return new StringData(this.data);
    }
}

export { StringData };
