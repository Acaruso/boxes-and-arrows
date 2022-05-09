import { colorMap } from "../constants/color_constants";

class DetailsRenderer {
    constructor(gfx, state, model, boxRenderer) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
        this.boxRenderer = boxRenderer;
    }

    render() {
        if (this.model.detailsVisible) {
            this.gfx.zOffset = 20;
            const bgColor = colorMap.gray;
            this.boxRenderer.drawBox(this.model.detailsBox, bgColor);
            this.gfx.zOffset = 0;
        }
    }
}

export { DetailsRenderer };
