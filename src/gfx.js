class Gfx {
    constructor() {
        this.canvas = document.getElementById("myCanvas")
        this.ctx = this.canvas.getContext("2d");
        this.textStyle = "Consolas";
        this.queue = [];
    }

    drawRect(rect, z=0) {
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

    strokeRect(rect, z=0) {
        const upperLeft = { x: rect.x, y: rect.y };
        const upperRight = { x: rect.x + rect.w, y: rect.y };
        const lowerRight = { x: rect.x + rect.w, y: rect.y + rect.h };
        const lowerLeft = { x: rect.x, y: rect.y + rect.h };

        this.drawLine(upperLeft, upperRight, z);
        this.drawLine(upperRight, lowerRight, z);
        this.drawLine(lowerRight, lowerLeft, z);
        this.drawLine(lowerLeft, upperLeft, z);
    }

    // note that y-coord is *bottom* left side of text
    drawText(text, size, coord, z=0) {
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

    drawLine(beginCoord, endCoord, z=0) {
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
