"use strict";

class GridRenderer {
    context;
    uv;

    constructor(context, uv) {
        this.context = context;
        this.uv = uv;
    }

    initGrid() {
        this.context.lineWidth = 0.6;
        this.context.strokeStyle = '#dcdcdc';
    }

    drawGridBorder(width, height) {
        //IMPORTANT: Do not forget 0.5 pixel offset

        // Left grid border
        this.context.moveTo(0.5, 0);
        this.context.lineTo(0.5, this.uv.uvLenPx(height));
        this.context.stroke();

        // Bottom grid border
        this.context.moveTo(0, this.uv.uvLenPx(height) - 0.5);
        this.context.lineTo(this.uv.uvLenPx(width), this.uv.uvLenPx(height) - 0.5);
        this.context.stroke();
    }

    drawCell(cell) {
        this.context.save();

        let cellPos = this.uv.getPx(cell.offset_x, cell.offset_y);

        // Top cell border
        this.context.beginPath();
        this.context.moveTo(
            Math.floor(cellPos.x),
            Math.floor(cellPos.y) + 0.5
        );
        this.context.lineTo(
            Math.floor((cellPos.x + this.uv.uvLenPx(cell.cell_width))),
            Math.floor(cellPos.y) + 0.5
        );
        this.context.stroke();

        // Right cell border
        this.context.beginPath();
        this.context.moveTo(
            Math.floor(cellPos.x + this.uv.uvLenPx(cell.cell_width)) - 0.5,
            Math.floor(cellPos.y)
        );
        this.context.lineTo(
            Math.floor(cellPos.x + this.uv.uvLenPx(cell.cell_width)) - 0.5,
            Math.floor(cellPos.y + this.uv.uvLenPx(cell.cell_height))
        );
        this.context.stroke();

        this.context.restore();
    }
}

export default GridRenderer;
