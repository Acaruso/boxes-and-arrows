class SelectedRegionRenderer {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
    }

    render() {
        this.drawSelectedRegion();
    }

    drawSelectedRegion() {
        if (this.model.draggingSelectedRegion) {
            this.gfx.drawRect(this.model.selectedRegion, 10);
        }
    }
}

export { SelectedRegionRenderer };
