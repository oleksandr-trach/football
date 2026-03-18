"use strict";

class Renderer {
    uv;
    context;
    display;

    constructor(display, uv) {
        this.display = display;
        this.context = display.context;
        this.uv = uv;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Clear canvas
    ///////////////////////////////////////////////////////////////////////////////
    clearCanvas() {
        this.context.clearRect(0, 0, this.display.getWidth(), this.display.getHeight());
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Draw background field
    ///////////////////////////////////////////////////////////////////////////////
    drawField(background) {
        this.context.drawImage(
            background,
            0,
            0,
            this.display.getCanvas().clientWidth,
            this.display.getCanvas().clientHeight
        );
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Draw grid using conversion from UV to display coordinates
    ///////////////////////////////////////////////////////////////////////////////
    drawGrid(width, height, grid) {
        this.initGrid();
        this.drawGridBorder(width, height)

        for (let i = 0; i < Object.keys(grid).length; i++) {
            for (let j = 0; j < Object.keys(grid[i]).length; j++) {
                let cell = grid[i][j];

                this.context.restore();
                this.drawCell(cell);
                this.drawPlayer(cell);
            }
        }
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

export default Renderer;
