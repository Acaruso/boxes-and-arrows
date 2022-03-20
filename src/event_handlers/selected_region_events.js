class SelectedRegionEvents {
    constructor(state, model, eventTable) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
    }

    addEvents() {
        this.eventTable.addEvent(
            "beginDraggingSelectedRegion",
            e => e.mousedown && !e.keyboard.control && !e.insideBox,
            e => {
                this.model.draggingSelectedRegion = true;
            }
        );

        this.eventTable.addEvent(
            "endDraggingSelectedRegion",
            e => e.mouseup,
            e => this.model.draggingSelectedRegion = false
        );

        this.eventTable.addEvent(
            "setSelectedRegionCoords",
            e => e.mousedown && !e.keyboard.control,
            e => {
                this.model.selectedRegion = {
                    x: e.mouse.coord.x,
                    y: e.mouse.coord.y,
                    w: 0,
                    h: 0,
                    alpha: 0.3,
                };
            }
        );
    }
}

export { SelectedRegionEvents };
