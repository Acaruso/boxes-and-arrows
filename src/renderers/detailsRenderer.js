import { Box } from "../box";

class DetailsRenderer {
    constructor(gfx, state, model, boxRenderer) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
        this.boxRenderer = boxRenderer;
    }

    render() {
        if (this.model.selectedBoxIds.length === 1) {
            const curId = this.model.selectedBoxIds[0];
            const curBox = this.model.boxes.getBox(curId);

            const newBoxCoord = { x: window.pageXOffset + 1, y: window.pageYOffset + 1 };
            const newBox = new Box("", newBoxCoord, 0);
            newBox.setData(curBox.detailsData);

            this.gfx.zOffset = 20;
            this.boxRenderer.drawBox(newBox);
            this.gfx.zOffset = 0;
        }
    }
}

export { DetailsRenderer };
