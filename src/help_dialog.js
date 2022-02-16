class HelpDialog {
    constructor() {
        this.rect = {
            x: 5,
            y: 5,
            w: 100,
            h: 100,
            color: "#A3BFFF",
        };

        this.charHeight = 14;
        this.charWidth = this.charHeight * 0.55;
        this.xPadding = 4;
        this.yPadding = 6;

        this.text = [
            "Welcome to Boxes and Arrows",
            "",
            "Keyboard shortcuts:",
            "Create a box: Alt-click",
            "Create a connection: Ctrl-click within a box,",
            "    then drag to another box",
            "Duplicate a box: Alt-click within a box",
            "Delete selected boxes: Delete",
            "Horizontally align selected boxes: Ctrl-H",
            "Vertically align selected boxes: Ctrl-V",
        ];
    }
}

export { HelpDialog };
