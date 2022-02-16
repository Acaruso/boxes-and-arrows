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

        this.text = "test 123";
    }
}

export { HelpDialog };
