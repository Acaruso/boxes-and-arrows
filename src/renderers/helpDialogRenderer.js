class HelpDialogRenderer {
    constructor(gfx, state, model, basicRenderer) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;

        this.basicRenderer = basicRenderer;
    }

    render() {
        this.drawHelpDialog();
    }

    drawHelpDialog() {
        const helpDialog = this.model.helpDialog;

        if (helpDialog.visible == false) {
            return;
        }

        this.gfx.drawRect(helpDialog.rect, 11);

        this.basicRenderer.drawMultiLineText(
            helpDialog.text,
            { x: helpDialog.rect.x, y: helpDialog.rect.y },
            12
        );

        this.drawCloseButton();
    }

    drawCloseButton() {
        const cbRect = this.model.helpDialog.closeButtonRect;

        this.gfx.strokeRect(cbRect, 20);

        this.gfx.drawLine(
            { x: cbRect.x, y: cbRect.y },
            { x: cbRect.x + cbRect.w, y: cbRect.y + cbRect.h },
            20
        );

        this.gfx.drawLine(
            { x: cbRect.x + cbRect.w, y: cbRect.y },
            { x: cbRect.x, y: cbRect.y + cbRect.h },
            20
        );
    }
}

export { HelpDialogRenderer };
