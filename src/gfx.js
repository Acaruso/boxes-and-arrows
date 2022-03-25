import { textConstants } from "./constants/text_constants";

class Gfx {
    constructor() {
        this.canvas = document.getElementById("myCanvas")
        this.ctx = this.canvas.getContext("2d");
        this.queue = [];
    }

    drawRect(rect, z=0) {
        const command = (ctx) => {
            const color = rect.color ? rect.color : "#000000";

            // 0.0 == transparent, 1.0 == solid
            const alpha = rect.alpha ? rect.alpha : 1.0;

            this.ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.rect(rect.x, rect.y, rect.w, rect.h);
            ctx.fill();
            ctx.closePath();
            this.ctx.globalAlpha = 1.0;
        };

        this.queue.push({
            command,
            z: z
        });
    }

    strokeRect(rect, z=0, color="#000000") {
        const upperLeft = { x: rect.x, y: rect.y };
        const upperRight = { x: rect.x + rect.w, y: rect.y };
        const lowerRight = { x: rect.x + rect.w, y: rect.y + rect.h };
        const lowerLeft = { x: rect.x, y: rect.y + rect.h };

        this.drawLine(upperLeft, upperRight, z, color);
        this.drawLine(upperRight, lowerRight, z, color);
        this.drawLine(lowerRight, lowerLeft, z, color);
        this.drawLine(lowerLeft, upperLeft, z, color);
    }

    drawLine(beginCoord, endCoord, z=0, color="#000000") {
        const command = (ctx) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
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

    strokeRectHeavy(rect, z=0, color="#000000") {
        this.drawLineHeavy(
            { x: rect.x, y: rect.y },
            { x: rect.x + rect.w + 1, y: rect.y },
            z,
            color
        );

        this.drawLineHeavy(
            { x: rect.x + rect.w, y: rect.y },
            { x: rect.x + rect.w, y: rect.y + rect.h + 1},
            z,
            color
        );

        this.drawLineHeavy(
            { x: rect.x + rect.w, y: rect.y + rect.h },
            { x: rect.x - 1, y: rect.y + rect.h },
            z,
            color
        );

        this.drawLineHeavy(
            { x: rect.x, y: rect.y + rect.h },
            { x: rect.x, y: rect.y - 1},
            z,
            color
        );
    }

    drawLineHeavy(beginCoord, endCoord, z=0, color="#000000") {
        const command = (ctx) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
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

    drawFilledCircle(coord, radius, z=0, color="#000000") {
        const command = (ctx) => {
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(
                coord.x,
                coord.y,
                radius,
                0,
                2 * Math.PI
            );
            ctx.fill();
        };

        this.queue.push({
            command,
            z: z
        });
    }

    drawText(text, size, coord, z=0) {
        const command = (ctx) => {
            ctx.font = `${size}px ${textConstants.textStyle}`;
            ctx.fillStyle = "#000000";

            // coord for fillText(text, coord) is *bottom* left side of text
            // however, our coord is for *top* left side of text
            // thus, we need to do coord.y + textConstants.charHeight
            ctx.fillText(text, coord.x, coord.y + textConstants.charHeight);
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
