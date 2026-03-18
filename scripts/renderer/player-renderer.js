"use strict";

class PlayerRenderer {
    context;
    uv;

    constructor(context, uv) {
        this.context = context;
        this.uv = uv;
    }

    drawPlayer(cell) {
        this.context.save();

        let cellCPos = this.uv.getPx(cell.center_x, cell.center_y);

        this.context.beginPath();
        this.context.arc(
            cellCPos.x,
            cellCPos.y,
            this.uv.uvLenPx(0.08),
            0,
            2 * Math.PI
        );
        this.context.fillStyle = `rgb(
            ${ Math.floor(255) },
            ${ Math.floor(255) },
            ${ Math.floor(255) }
        )`;
        this.context.fill();

        this.context.shadowColor = "#000000";
        this.context.shadowBlur = 10;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;

        this.context.lineWidth = 1;
        this.context.strokeStyle = "#ffffff";
        this.context.stroke();

        this.context.restore();
    }
}

export default PlayerRenderer;
