import { ArrayRenderer } from "./arrayRenderer";
import { BasicRenderer } from "./basicRenderer";
import { BoxRenderer } from "./boxRenderer";
import { HelpDialogRenderer } from "./helpDialogRenderer";
import { LineRenderer } from "./lineRenderer";
import { SelectedRegionRenderer } from "./selectedRegionRenderer";

class Renderer {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;

        this.basicRenderer = new BasicRenderer(gfx, state, model);

        // this.arrayRenderer = new ArrayRenderer(gfx, state, model);
        // this.boxRenderer = new BoxRenderer(gfx, state, model, this.basicRenderer);
        // this.helpDialogRenderer = new HelpDialogRenderer(
        //     gfx,
        //     state,
        //     model,
        //     this.basicRenderer
        // );
        // this.lineRenderer = new LineRenderer(gfx, state, model);
        // this.selectedRegionRenderer = new SelectedRegionRenderer(gfx, state, model);
        
        this.renderers = [
            new ArrayRenderer(gfx, state, model),
            new BoxRenderer(gfx, state, model, this.basicRenderer),
            this.helpDialogRenderer = new HelpDialogRenderer(
                gfx,
                state,
                model,
                this.basicRenderer
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
