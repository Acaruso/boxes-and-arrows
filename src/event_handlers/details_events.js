import { Box } from "../box";

class DetailsEvents {
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
                if (this.model.detailsVisible) {
                    if (this.state.isMouseInside(this.model.detailsBox.rect)) {
                        e.preventDefault();

                        if (e.wheelDeltaY < 0) {
                            this.model.detailsBox.scrollDown();
                        } else if (e.wheelDeltaY > 0) {
                            this.model.detailsBox.scrollUp();
                        }
                    }
                }
            }
        );
    }
}

export { DetailsEvents };
