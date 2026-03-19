"use strict";

import GridRenderer from "./renderer/grid-renderer.js";
import PlayerRenderer from "./renderer/player-renderer.js";

class Renderer {
    uv;
    context;
    display;
    gridRenderer;
    playerRenderer;

    constructor(display, uv) {
        this.display = display;
        this.context = display.context;
        this.uv = uv;
        this.gridRenderer = new GridRenderer(
            display.context,
            uv
        );
        this.playerRenderer = new PlayerRenderer(
            display.context,
            uv
        );
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
    // Grid drawer should only be responsible for drawing a grid, nothing more
    // This is a logic
    ///////////////////////////////////////////////////////////////////////////////
    drawGrid(width, height, grid) {
        this.gridRenderer.initGrid();
        this.gridRenderer.drawGridBorder(width, height)

        for (let i = 0; i < Object.keys(grid).length; i++) {
            for (let j = 0; j < Object.keys(grid[i]).length; j++) {
                let cell = grid[i][j];

                this.context.restore();
                this.gridRenderer.drawCell(cell);
            }
        }
    }

    drawPlayers(players) {
        players.forEach(player => {
            this.playerRenderer.draw(player);
        });
    }
}

export default Renderer;
