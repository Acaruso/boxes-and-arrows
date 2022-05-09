import { Box } from "../box";

class DetailsViewEvents {
    constructor(state, model, eventTable) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
    }

    addEvents() {
        this.eventTable.addEvent(
            "scrollDetailsView",
            e => e.wheel,
            e => {
                if (this.model.selectedBoxIds.length === 1) {
                    const curId = this.model.selectedBoxIds[0];
                    const curBox = this.model.boxes.getBox(curId);
                    if (curBox.detailsData.length > 0) {
                        const newBoxCoord = {
                            x: window.pageXOffset + 1,
                            y: window.pageYOffset + 1
                        };
                        const newBox = new Box("", newBoxCoord, 0);
                        newBox.setData(curBox.detailsData);

                        if (this.state.isMouseInside(newBox.rect)) {
                            e.preventDefault();

                            // this.model.detailsPos ranges from [0, 9]
                            if (e.wheelDeltaY < 0 && this.model.detailsPos < 9) {
                                this.model.detailsPos++;
                            } else if (e.wheelDeltaY > 0 && this.model.detailsPos > 0) {
                                this.model.detailsPos--;
                            }
                            console.log(this.model.detailsPos);
                        }
                    }
                }
            }
        );

        this.eventTable.addEvent(
            "scrollDetailsViewPreventDefault",
            e => e.scroll,
            e => {
                if (this.model.selectedBoxIds.length === 1) {
                    const curId = this.model.selectedBoxIds[0];
                    const curBox = this.model.boxes.getBox(curId);
                    if (curBox.detailsData.length > 0) {
                        const newBoxCoord = {
                            x: window.pageXOffset + 1,
                            y: window.pageYOffset + 1
                        };
                        const newBox = new Box("", newBoxCoord, 0);
                        newBox.setData(curBox.detailsData);

                        if (this.state.isMouseInside(newBox.rect)) {
                            console.log('new');
                            e.preventDefault();
                        }
                    }
                }
            }
        );
    }
}

export { DetailsViewEvents };
