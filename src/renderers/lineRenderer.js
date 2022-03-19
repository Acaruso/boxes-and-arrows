class LineRenderer {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
    }

    render() {
        this.drawLine();
    }

    drawLine() {
        if (
            this.state.cur.mouse.clicked
            && this.state.cur.keyboard.control
            && this.model.drawingLine
        ) {
            const curMouse = this.state.cur.mouse;
            this.gfx.drawLine(this.model.lineBegin, { ...curMouse.coord }, -1);
        }
    }
}

export { LineRenderer };
