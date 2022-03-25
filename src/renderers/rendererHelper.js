import { textConstants } from "../constants/text_constants";

class RendererHelper {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
    }

    drawMultiLineText(text, coord, z=0) {
        for (let i = 0; i < text.length; i++) {
            this.gfx.drawText(
                text[i],
                textConstants.charHeight,
                {
                    x: coord.x + textConstants.xPadding,
                    y: coord.y + (textConstants.charHeight * (i + 1))
                },
                z
            );
        }
    }
}

export { RendererHelper };
