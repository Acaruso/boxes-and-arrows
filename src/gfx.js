class Gfx {
    constructor() {
        this.canvas = document.getElementById("myCanvas")
        this.ctx = this.canvas.getContext("2d");
        this.textStyle = "Consolas";
        this.queue = [];
    }

    // drawRect(rect) {
    //     const color = rect.color ? rect.color : "#000000";
    //     this.ctx.fillStyle = color;
    //     this.ctx.beginPath();
    //     this.ctx.rect(rect.x, rect.y, rect.w, rect.h);
    //     this.ctx.fill();
    //     this.ctx.closePath();
    // }

    // strokeRect(rect) {
    //     const color = rect.color ? rect.color : "#000000";
    //     this.ctx.fillStyle = color;
    //     this.ctx.strokeStyle = color;
    //     this.ctx.lineWidth = 1;
    //     this.ctx.beginPath();
    //     this.ctx.rect(rect.x, rect.y, rect.w, rect.h);
    //     this.ctx.stroke();
    //     this.ctx.closePath();
    // }

    // // y coord is BOTTOM left side of text
    // drawText(text, size, coord) {
    //     this.ctx.font = `${size}px ${this.textStyle}`;
    //     this.ctx.fillStyle = "#000000";
    //     this.ctx.fillText(text, coord.x, coord.y);
    // }

    // drawLine(beginCoord, endCoord) {
    //     this.ctx.fillStyle = "#000000";
    //     this.ctx.beginPath();
    //     this.ctx.moveTo(beginCoord.x, beginCoord.y);
    //     this.ctx.lineTo(endCoord.x, endCoord.y);
    //     this.ctx.stroke();
    // }

    //////////////////////////////////////////////////////

    drawRect(rect, z = 0) {
        const command = (ctx) => {
            const color = rect.color ? rect.color : "#000000";
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.rect(rect.x, rect.y, rect.w, rect.h);
            ctx.fill();
            ctx.closePath();
        };

        this.queue.push({
            command,
            z: z
        });
    }

    strokeRect(rect, z = 0) {
        const command = (ctx) => {
            const color = rect.color ? rect.color : "#000000";
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.rect(rect.x, rect.y, rect.w, rect.h);
            ctx.stroke();
            ctx.closePath();
        };

        this.queue.push({
            command,
            z: z
        });
    }

    // y coord is BOTTOM left side of text
    drawText(text, size, coord, z = 0) {
        // console.log('drawtext')
        // console.log(z)
        const command = (ctx) => {
            ctx.font = `${size}px ${this.textStyle}`;
            ctx.fillStyle = "#000000";
            ctx.fillText(text, coord.x, coord.y);
        };

        this.queue.push({
            command,
            z: z
        });
    }

    drawLine(beginCoord, endCoord, z = 0) {
        const command = (ctx) => {
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.moveTo(beginCoord.x, beginCoord.y);
            ctx.lineTo(endCoord.x, endCoord.y);
            ctx.stroke();
        };

        this.queue.push({
            command,
            z: z
        });
    }

    draw() {
        this.queue.sort((first, second) => {
            return second.z - first.z;
        });

        while (this.queue.length > 0) {
            const elt = this.queue[this.queue.length - 1];
            elt.command(this.ctx);
            this.queue.pop();
        }
    }
    
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export { Gfx };
