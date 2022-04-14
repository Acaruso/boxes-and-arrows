import { BoxRenderer } from "./boxRenderer";
import { HelpDialogRenderer } from "./helpDialogRenderer";
import { LineRenderer } from "./lineRenderer";
import { RendererHelper } from "./rendererHelper";
import { SelectedRegionRenderer } from "./selectedRegionRenderer";

class Renderer {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;

        this.rendererHelper = new RendererHelper(gfx, state, model);

        this.renderers = [
            new BoxRenderer(gfx, state, model, this.rendererHelper),
            this.helpDialogRenderer = new HelpDialogRenderer(
                gfx,
                state,
                model,
                this.rendererHelper
            ),
            this.lineRenderer = new LineRenderer(gfx, state, model),
            this.selectedRegionRenderer = new SelectedRegionRenderer(gfx, state, model),
        ];
    }

    render() {
        for (const renderer of this.renderers) {
            renderer.render();
        }
    }
}

export { Renderer };
