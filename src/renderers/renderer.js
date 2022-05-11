import { BoxRenderer } from "./boxRenderer";
import { DetailsRenderer } from "./detailsRenderer";
import { HelpDialogRenderer } from "./helpDialogRenderer";
import { LineRenderer } from "./lineRenderer";
import { RendererHelper } from "./rendererHelper";
import { SelectedRegionRenderer } from "./selectedRegionRenderer";

class Renderer {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;

        const rendererHelper = new RendererHelper(gfx, state, model);
        const boxRenderer = new BoxRenderer(gfx, state, model, rendererHelper);

        this.renderers = [
            boxRenderer,
            new HelpDialogRenderer(
                gfx,
                state,
                model,
                rendererHelper
            ),
            new LineRenderer(gfx, state, model),
            new SelectedRegionRenderer(gfx, state, model),
            new DetailsRenderer(gfx, state, model, boxRenderer),
        ];
    }

    render() {
        for (const renderer of this.renderers) {
            renderer.render();
        }
    }
}

export { Renderer };
